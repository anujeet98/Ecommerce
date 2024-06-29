import { Request, Response, NextFunction } from "express";
import { product, productResult } from "../dto/product";
import Product, { IProduct } from "../models/product";
import Cart, { ICart, ICartItem } from "../models/cart";
import { cartItemObj } from "../dto/cartItem";
import { Types } from "mongoose";


export const getCart = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.id;
        let cart = await Cart.findOne({user: userId});
        if(cart && cart.items.length>0)
            res.send(cart);
        else
            res.send(null);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error while fetching cart data");
    }
}

export const addToCart = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.id;
        const { product: productId, quantity } = req.body as cartItemObj;

        let existingProduct = await Product.findOne({_id: productId}) as IProduct;

        if(!existingProduct){
            res.status(404).send('Cart item does not exists');
        }

        let cart = await Cart.findOne({user: userId});

        const price = existingProduct.price;

        if(cart){
            let index = cart.items.findIndex(p => p.product == productId);

            // append to old cart
            if(index > -1)
            {
                let productItem = cart.items[index];
                productItem.quantity += +quantity;
                cart.items[index] = productItem;
            }
            else {
                cart.items.push({ product: productId, quantity: +quantity, price: price } as ICartItem);
            }
            cart.total += +quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // new cart
            const newCart = await Cart.create({
                user: userId,
                items: [{ 
                    product: productId, 
                    quantity: +quantity,
                    price: price,
                }],
                total: +quantity*price
            });
            return res.status(201).send(newCart);
        }       
    }
    catch(err){
        console.error('addToCart Error :: ',err);
        res.status(500).json({error: "Internal server error while adding cartItem"});
    }
}


export const deleteFromCart = async(req: Request, res: Response, next: NextFunction) => { 
    try{
        const userId = req.user?._id;
        const productId = req.params.itemId;

        let cart = await Cart.findOne({user: userId}) as ICart;
        let prod = await Product.findOne({_id: productId}) as IProduct;
        let id = prod._id;

        let index = cart.items.findIndex(p => {
            console.log(p.product === id as IProduct, p.product, id);
        });
        console.log(index)
        if(index > -1)
        {
            let productItem = cart.items[index];
            cart.total -= productItem.quantity*prod.price;
            cart.items.splice(index,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch(err){
        console.error('deleteFromCart Error :: ',err);
        res.status(500).json({error: "Internal server error while deleting a cartItem"});
    }
}


