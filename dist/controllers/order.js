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
exports.checkout = exports.getOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const cart_1 = __importDefault(require("../models/cart"));
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orders = yield order_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    }
    catch (err) {
        console.error('getOrder Error :: ', err);
        res.status(500).json({ error: "Internal server error while fetching order history" });
    }
});
exports.getOrder = getOrder;
const checkout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let cart = yield cart_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (cart) {
            const order = yield order_1.default.create({
                user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                items: cart.items,
                totalPrice: cart.total
            });
            const data = yield cart_1.default.findByIdAndDelete({ _id: cart._id });
            req.order = order;
            next();
            // return res.status(201).send(order);
        }
        else {
            res.status(500).send("You do not have items in cart");
        }
    }
    catch (err) {
        console.error('checkout Error :: ', err);
        res.status(500).json({ error: "Internal server error while performing checkout" });
    }
});
exports.checkout = checkout;
