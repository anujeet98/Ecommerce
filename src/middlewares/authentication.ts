import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../models/user';
import { authToken } from '../dto';

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}

const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization as string;
        if(!process.env.JWT_SECRET)
            throw new Error('JWT_TOKEN_SECRET_NOT_FOUND in env');

            
        const verifiedToken = jwt.verify(token, `${process.env.JWT_TOKEN_SECRET}`) as authToken;

        const verifiedUser = await User.findById({_id: verifiedToken.userId});

        if(verifiedUser){
            req.user = verifiedUser;
            next();
        }
        else
            return res.status(401).json({error: "User not verified", message: "User not verified. \nPlease sign-in again"});
    }
    catch(err: any){
        if(err.name === 'JsonWebTokenError')
            return res.status(401).json({ error: 'User unauthorized', message: 'User unauthorized. \nPlease sign-in again'});
        if(err.name === 'TokenExpiredError')
            return res.status(401).json({error: 'Token expired', message: 'Authentication token expired. \nPlease sign in again'});

        console.error('authenticationError: ', err);
        res.status(500).json({message: "Internal server error"});
    }
}

export default authenticate;