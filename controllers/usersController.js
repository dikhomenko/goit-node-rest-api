import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";


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
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { user } = req;
  const { subscription } = req.body;
  const updatedUser = await usersService.updateSubscription(user.id, subscription);
  res.json({ email: updatedUser.email, subscription: updatedUser.subscription });
};

export const registerUserWrapper = controllerWrapper(registerUser);
export const loginUserWrapper = controllerWrapper(loginUser);
export const logoutUserWrapper = controllerWrapper(logoutUser);
export const getCurrentUserWrapper = controllerWrapper(getCurrentUser);
export const updateSubscriptionWrapper  = controllerWrapper(updateSubscription);