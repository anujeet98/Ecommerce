"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const email_1 = __importDefault(require("../services/email"));
const router = express_1.default.Router();
router.get('/order', authentication_1.default, order_1.getOrder);
router.post('/order', authentication_1.default, order_1.checkout, email_1.default);
exports.default = router;
