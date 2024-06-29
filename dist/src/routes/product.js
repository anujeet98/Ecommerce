"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const admin_1 = require("../middlewares/admin");
const product_1 = require("../controllers/product");
const input_validator_1 = require("../middlewares/input-validator");
const router = express_1.default.Router();
router.get('/products', product_1.getProducts);
router.post('/products', authentication_1.default, admin_1.admin, input_validator_1.productValidator, product_1.addProduct);
router.put('/products/:id', authentication_1.default, admin_1.admin, input_validator_1.productValidator, product_1.editProduct);
router.delete('/products/:id', authentication_1.default, admin_1.admin, product_1.deleteProduct);
exports.default = router;
