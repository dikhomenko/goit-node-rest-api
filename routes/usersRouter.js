import express from "express";
import {
  registerUserWrapper as registerUser,
  loginUserWrapper as loginUser,
  logoutUserWrapper as logoutUser,
  getCurrentUserWrapper as getCurrentUser,
  updateSubscriptionWrapper as updateSubscription,
  updateAvatarWrapper as updateAvatar
} from "../controllers/usersController.js";
import validateBody from "../Helpers/validateBody.js";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import authMiddleware from "../helpers/authMiddleware.js";
import multer from "multer";

const usersRouter = express.Router();

const upload = multer();

// public endpoints
usersRouter.post("/register", validateBody(createUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

// private endpoints
usersRouter.post("/logout", authMiddleware, logoutUser);
usersRouter.get("/current", authMiddleware, getCurrentUser);
usersRouter.patch("/subscription", authMiddleware, updateSubscription);
usersRouter.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

export default usersRouter;