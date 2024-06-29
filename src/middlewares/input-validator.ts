import {Request, Response, NextFunction} from "express";
import { authObj } from "../dto";
import { product } from "../dto/product";


export const authValidator = (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body as authObj;
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors: string[] = [];
    if(!email)
        errors.push("Missing email");
    else if(!validRegex.test(email))
        errors.push("Invalid email");
    
    if(!password)
        errors.push("Missing password");
    else if(password.length<6)
        errors.push("Required password length > 6");

    if(errors.length!==0){
        return res.status(422).json({message: "Invalid input recieved", errors: errors});
    }
    
    next();
}


export const productValidator = (req: Request, res: Response, next: NextFunction) => {
    const {title, description, image_url, price} = req.body as product;

    console.log(req.body);
    const errors: string[] = [];
    if(!title || title.trim().length===0)
        errors.push("Missing title");
    if(!description || description.trim().length===0)
        errors.push("Missing description");
    if(!image_url || image_url.trim().length===0)
        errors.push("Missing image_url");
    if(!price)
        errors.push("Missing price");
    else if(isNaN(+price) || price<=0)
        errors.push("Invalid price");


    if(errors.length!==0){
        return res.status(422).json({message: "Invalid input recieved", errors: errors});
    }
    
    next();
}