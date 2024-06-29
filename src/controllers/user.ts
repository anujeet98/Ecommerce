import { Request, Response, NextFunction } from "express";
import { authObj } from "../dto";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {username, email, password} = req.body as authObj;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({error: "Email already exists.\nKindly login with your credentials"});
        }

        //else, user doesn't exists -> Encrypt password -> create new record
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({username: username, email:email, password:hash});
        await newUser.save();

        return res.status(201).json({message: "User account created. \nPlease sign-in to continue"});
    }catch(err){
        console.log("signup error: ",err);
        res.status(500).json({error: 'Internal server error while signup'});
    }
}

export const signin = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body as authObj;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            //user email exists => verify password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if(passwordMatch){
                const payload = {
                    userId: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role
                };
                return res.status(201).json({message: "User login successful", status: "success", token: jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn: '1h'}) });
            }
            else{
                return res.status(401).json({error: "Incorrect user password."});
            }
        }
        else{
            //user email doesn't exist
            return res.status(404).json({error: "Email not found.\nUser not authenticated."});
        }
    }
    catch(err){
        console.log('signin error: ',err);
        res.status(500).json({error: 'Internal server error while signin'});
    }
}