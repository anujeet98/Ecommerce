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
exports.signin = exports.signup = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists.\nKindly login with your credentials" });
        }
        //else, user doesn't exists -> Encrypt password -> create new record
        const hash = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.User({ username: username, email: email, password: hash });
        yield newUser.save();
        return res.status(201).json({ message: "User account created. \nPlease sign-in to continue" });
    }
    catch (err) {
        console.log("signup error: ", err);
        res.status(500).json({ error: 'Internal server error while signup' });
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email: email });
        if (existingUser) {
            //user email exists => verify password
            const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
            if (passwordMatch) {
                const payload = {
                    userId: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role
                };
                return res.status(201).json({ message: "User login successful", status: "success", token: jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1h' }), role: existingUser.role });
            }
            else {
                return res.status(401).json({ error: "Incorrect user password." });
            }
        }
        else {
            //user email doesn't exist
            return res.status(404).json({ error: "Email not found.\nUser not authenticated." });
        }
    }
    catch (err) {
        console.log('signin error: ', err);
        res.status(500).json({ error: 'Internal server error while signin' });
    }
});
exports.signin = signin;
