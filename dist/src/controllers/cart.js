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
exports.deleteFromCart = exports.addToCart = exports.getCart = void 0;
const product_1 = __importDefault(require("../models/product"));
const cart_1 = __importDefault(require("../models/cart"));
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        let cart = yield cart_1.default.findOne({ user: userId });
        if (cart && cart.items.length > 0)
            res.send(cart);
        else
            res.send(null);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error while fetching cart data");
    }
});
exports.getCart = getCart;
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { product: productId, quantity } = req.body;
        let existingProduct = yield product_1.default.findOne({ _id: productId });
        if (!existingProduct) {
            res.status(404).send('Cart item does not exists');
        }
        let cart = yield cart_1.default.findOne({ user: userId });
        const price = existingProduct.price;
        if (cart) {
            let index = cart.items.findIndex(p => p.product == productId);
            // append to old cart
            if (index > -1) {
                let productItem = cart.items[index];
                productItem.quantity += +quantity;
                cart.items[index] = productItem;
            }
            else {
                cart.items.push({ product: productId, quantity: +quantity, price: price });
            }
            cart.total += +quantity * price;
            cart = yield cart.save();
            return res.status(201).send(cart);
        }
        else {
            // new cart
            const newCart = yield cart_1.default.create({
                user: userId,
                items: [{
                        product: productId,
                        quantity: +quantity,
                        price: price,
                    }],
                total: +quantity * price
            });
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        console.error('addToCart Error :: ', err);
        res.status(500).json({ error: "Internal server error while adding cartItem" });
    }
});
exports.addToCart = addToCart;
const deleteFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const productId = req.params.itemId;
        let cart = yield cart_1.default.findOne({ user: userId });
        let prod = yield product_1.default.findOne({ _id: productId });
        let id = prod._id;
        let index = cart.items.findIndex(p => p.product._id.equals(prod._id));
        if (index > -1) {
            let productItem = cart.items[index];
            productItem.quantity -= 1;
            cart.items[index] = productItem;
            if (cart.items[index].quantity === 0)
                cart.items.splice(index, 1);
            cart.total -= productItem.price;
        }
        cart = yield cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.error('deleteFromCart Error :: ', err);
        res.status(500).json({ error: "Internal server error while deleting a cartItem" });
    }
});
exports.deleteFromCart = deleteFromCart;
