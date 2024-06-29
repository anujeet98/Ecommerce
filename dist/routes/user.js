"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const input_validator_1 = require("../middlewares/input-validator");
const router = express_1.default.Router();
router.post('/signin', input_validator_1.authValidator, user_1.signin);
router.post('/signup', input_validator_1.authValidator, user_1.signup);
// router.get('/', authenticate);
exports.default = router;
