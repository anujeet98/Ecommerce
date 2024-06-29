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
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({ deleted: "N" }).sort({ date: -1 });
        res.status(200).json(products);
    }
    catch (err) {
        console.error('GetProducts Error :: ', err);
        res.status(500).json({ error: "Internal server error while fetching products" });
    }
});
exports.getProducts = getProducts;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image_url, price } = req.body;
        const newProduct = new product_1.default({
            title,
            description,
            image_url,
            price
        });
        const prod = yield newProduct.save();
        res.status(200).json(prod);
    }
    catch (err) {
        console.error('addProduct Error :: ', err);
        res.status(500).json({ error: "Internal server error while adding a product" });
    }
});
exports.addProduct = addProduct;
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = yield product_1.default.findById({ _id: req.params.id });
        if (!prod)
            return res.status(404).json({ error: "Product to be updated does not exists" });
        const { title, description, image_url, price } = req.body;
        prod.title = title;
        prod.description = description;
        prod.image_url = image_url;
        prod.price = price;
        yield prod.save();
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error('editProduct Error :: ', err);
        res.status(500).json({ error: "Internal server error while updating a product" });
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = yield product_1.default.findById({ _id: req.params.id });
        if (!prod)
            return res.status(404).json({ error: "Product to be deleted does not exists" });
        prod.deleted = "Y";
        yield prod.save();
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error('deleteProduct Error :: ', err);
        res.status(500).json({ error: "Internal server error while deleting a product" });
    }
});
exports.deleteProduct = deleteProduct;
