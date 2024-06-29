import { Request, Response, NextFunction } from "express";
import { product } from "../dto/product";
import Product, { IProduct } from "../models/product";


export const getProducts = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const products = await Product.find({deleted: "N"}).sort({date: -1}) as [IProduct];
        res.status(200).json(products);
    }
    catch(err){
        console.error('GetProducts Error :: ',err);
        res.status(500).json({error: "Internal server error while fetching products"});
    }
}

export const addProduct = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { title, description, image_url, price } = req.body as product;
        const newProduct = new Product({
            title,
            description,
            image_url,
            price
        });

        const prod = await newProduct.save();
        res.status(200).json(prod);
    }
    catch(err){
        console.error('addProduct Error :: ',err);
        res.status(500).json({error: "Internal server error while adding a product"});
    }
}


export const editProduct = async(req: Request, res: Response, next: NextFunction) => { 
    try{
        const prod = await Product.findById({_id: req.params.id}) as IProduct;

        if(!prod)
            return res.status(404).json({error: "Product to be updated does not exists"});

        const { title, description, image_url, price } = req.body as product;

        prod.title = title;
        prod.description = description;
        prod.image_url = image_url;
        prod.price = price;
        await prod.save();

        res.status(200).json({success: true});

    }
    catch(err){
        console.error('editProduct Error :: ',err);
        res.status(500).json({error: "Internal server error while updating a product"});
    }
}

export const deleteProduct = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const prod = await Product.findById({_id: req.params.id}) as IProduct;

        if(!prod)
            return res.status(404).json({error: "Product to be deleted does not exists"});

        prod.deleted = "Y";
        await prod.save();

        res.status(200).json({success: true});

    }
    catch(err){
        console.error('deleteProduct Error :: ',err);
        res.status(500).json({error: "Internal server error while deleting a product"});
    }
}

