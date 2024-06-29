"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const router = express_1.default.Router();
router.get('/cart', authentication_1.default, cart_1.getCart);
router.post('/cart', authentication_1.default, cart_1.addToCart);
router.delete('/cart/:itemId', authentication_1.default, cart_1.deleteFromCart);
exports.default = router;
