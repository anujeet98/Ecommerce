"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!process.env.JWT_SECRET)
            throw new Error('JWT_TOKEN_SECRET_NOT_FOUND in env');
        const verifiedToken = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        const verifiedUser = yield user_1.User.findById({ _id: verifiedToken.userId });
        if (verifiedUser) {
            req.user = verifiedUser;
            next();
        }
        else
            return res.status(401).json({ error: "User not verified", message: "User not verified. \nPlease sign-in again" });
    }
    catch (err) {
        if (err.name === 'JsonWebTokenError')
            return res.status(401).json({ error: 'User unauthorized', message: 'User unauthorized. \nPlease sign-in again' });
        if (err.name === 'TokenExpiredError')
            return res.status(401).json({ error: 'Token expired', message: 'Authentication token expired. \nPlease sign in again' });
        console.error('authenticationError: ', err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = authenticate;
