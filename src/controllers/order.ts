import { Request, Response, NextFunction } from "express";
import { product } from "../dto/product";
import Product, { IProduct } from "../models/product";
import Order, { IOrder } from "../models/order";
import Cart, { ICart } from "../models/cart";
import { IUser, User } from "../models/user";

interface CheckoutRequest extends Request {
    user?: IUser;
    order?: IOrder;
}

export const getOrder = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const orders = await Order.find({user: req.user?._id}).sort({createdAt: -1});
        res.status(200).json(orders);

    }
    catch(err){
        console.error('getOrder Error :: ',err);
        res.status(500).json({error: "Internal server error while fetching order history"});
    }
}


export const checkout = async(req: CheckoutRequest, res: Response, next: NextFunction) => {
    try{

        let cart = await Cart.findOne({user: req.user?._id}) as ICart;
        if(cart){
            const order = await Order.create({
                user: req.user?._id,
                items: cart.items,
                totalPrice: cart.total
            }); 
            const data = await Cart.findByIdAndDelete({_id:cart._id});
            req.order = order;
            next();
            // return res.status(201).send(order);
        }
        else{
            res.status(500).send("You do not have items in cart");
        }
    }
    catch(err){
        console.error('checkout Error :: ',err);
        res.status(500).json({error: "Internal server error while performing checkout"});
    }
}