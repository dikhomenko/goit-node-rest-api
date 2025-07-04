import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import path from "path";
import fs from "fs/promises";

const registerUser = async (req, res) => {
  const { email, password, subscription } = req.body;
  const result = await usersService.registerUser({ email, password, subscription });
  res.status(201).json(result);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await usersService.loginUser({ email, password });
  res.json(result);
};

const logoutUser = async (req, res) => {
  const { user } = req;
  await usersService.logoutUser(user.id);
  res.status(204).send();
};

const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

const updateSubscription = async (req, res) => {
  const { user } = req;
  const { subscription } = req.body;
  const updatedUser = await usersService.updateSubscription(user.id, subscription);
  res.json({ email: updatedUser.email, subscription: updatedUser.subscription });
};

const updateAvatar = async (req, res) => {
  const { user } = req;
  if (!req.file) { 
    throw HttpError(400, "Provide avatar image");
  }

  const ext = path.extname(req.file.originalname);
  const tmpPath = await saveToTmp(req.file);
  const fileName = await moveToAvatars(tmpPath, user.id, ext);

  const avatarURL = `/avatars/${fileName}`;
  await usersService.updateAvatar(user.id, avatarURL);

  res.json({ avatarURL });
};

const saveToTmp = async (file) => {
  const tmpDir = path.join(process.cwd(), "tmp");
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpPath = path.join(tmpDir, file.originalname);
  await fs.writeFile(tmpPath, file.buffer);
  return tmpPath;
};

const moveToAvatars = async (tmpPath, userId, ext) => {
  const avatarsDir = path.join(process.cwd(), "public", "avatars");
  await fs.mkdir(avatarsDir, { recursive: true });
  const fileName = `${userId}_${Date.now()}${ext}`;
  const finalPath = path.join(avatarsDir, fileName);
  await fs.rename(tmpPath, finalPath);
  return fileName;
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await usersService.findUserByVerificationToken(verificationToken);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await usersService.verifyUser(user.id);
  res.json({ message: "Verification successful" });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const result = await usersService.resendVerificationEmail(email);
  res.json(result);
};


export const registerUserWrapper = controllerWrapper(registerUser);
export const loginUserWrapper = controllerWrapper(loginUser);
export const logoutUserWrapper = controllerWrapper(logoutUser);
export const getCurrentUserWrapper = controllerWrapper(getCurrentUser);
export const updateSubscriptionWrapper  = controllerWrapper(updateSubscription);
export const updateAvatarWrapper = controllerWrapper(updateAvatar);
export const verifyEmailWrapper = controllerWrapper(verifyEmail);
export const resendVerificationEmailWrapper = controllerWrapper(resendVerificationEmail);