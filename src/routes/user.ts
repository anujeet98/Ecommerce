import express from "express";
import { signin, signup } from "../controllers/user";
import { authValidator } from "../middlewares/input-validator";
import authenticate from "../middlewares/authentication";

const router = express.Router();

router.post('/signin', authValidator, signin);

router.post('/signup', authValidator, signup);

// router.get('/', authenticate);

export default router;