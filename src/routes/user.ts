import express from "express";
import { signin, signup } from "../controllers/user";
import { authValidator } from "../middlewares/input-validator";

const router = express.Router();

router.post('/signin', authValidator, signin);

router.post('/signup', authValidator, signup);

export default router;