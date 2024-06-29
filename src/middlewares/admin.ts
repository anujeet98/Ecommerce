import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";

interface AuthRequest extends Request {
    user?: IUser;
}

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'User not authorized as an admin' });
    }
};