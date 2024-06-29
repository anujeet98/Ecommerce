"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = exports.authValidator = void 0;
const authValidator = (req, res, next) => {
    const { email, password } = req.body;
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    if (!email)
        errors.push("Missing email");
    else if (!validRegex.test(email))
        errors.push("Invalid email");
    if (!password)
        errors.push("Missing password");
    else if (password.length < 6)
        errors.push("Required password length > 6");
    if (errors.length !== 0) {
        return res.status(422).json({ message: "Invalid input recieved", errors: errors });
    }
    next();
};
exports.authValidator = authValidator;
const productValidator = (req, res, next) => {
    const { title, description, image_url, price } = req.body;
    console.log(req.body);
    const errors = [];
    if (!title || title.trim().length === 0)
        errors.push("Missing title");
    if (!description || description.trim().length === 0)
        errors.push("Missing description");
    if (!image_url || image_url.trim().length === 0)
        errors.push("Missing image_url");
    if (!price)
        errors.push("Missing price");
    else if (isNaN(+price) || price <= 0)
        errors.push("Invalid price");
    if (errors.length !== 0) {
        return res.status(422).json({ message: "Invalid input recieved", errors: errors });
    }
    next();
};
exports.productValidator = productValidator;
