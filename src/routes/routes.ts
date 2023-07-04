import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Authcontroller } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/Auth";

const userController = new UserController();
const authController = new Authcontroller();

export const router = Router();

router.get("/", AuthMiddleware, userController.getUsers);
router.post("/create", userController.createUser);
router.post("/authenticate", authController.authenticate);
