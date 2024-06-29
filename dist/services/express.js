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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const cart_1 = __importDefault(require("../routes/cart"));
const order_1 = __importDefault(require("../routes/order"));
const path_1 = __importDefault(require("path"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
    app.use('/api', user_1.default);
    app.use('/api', product_1.default);
    app.use('/api', cart_1.default);
    app.use('/api', order_1.default);
    return app;
});
