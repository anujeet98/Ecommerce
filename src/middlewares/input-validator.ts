import {Request, Response, NextFunction} from "express";
import { authObj } from "../dto";


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