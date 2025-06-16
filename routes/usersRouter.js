import express from "express";
import {
  registerUserWrapper as registerUser,
  loginUserWrapper as loginUser,
  logoutUserWrapper as logoutUser,
  getCurrentUserWrapper as getCurrentUser,
  updateSubscriptionWrapper as updateSubscription,
} from "../controllers/usersController.js";
import validateBody from "../Helpers/validateBody.js";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import authMiddleware from "../helpers/authMiddleware.js";

const usersRouter = express.Router();


usersRouter.post("/register", validateBody(createUserSchema), registerUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

// (private)
usersRouter.post("/logout", authMiddleware, logoutUser);

// (private)
usersRouter.get("/current", authMiddleware, getCurrentUser);

// (private)
usersRouter.patch("/subscription", authMiddleware, updateSubscription);

export default usersRouter;