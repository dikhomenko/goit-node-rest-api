import User from "../db/sequelize/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";
import gravatar from "gravatar";

export async function registerUser({ email, password, subscription = "starter" }) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw HttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

  const newUser = await User.create({ email, password: hashedPassword, subscription, avatarURL });
  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    }
  };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  };
}

export async function logoutUser(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(401, "Not authorized");
  user.token = null;
  await user.save();
}

export async function updateSubscription(userId, subscription) {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(404, "User not found");
  user.subscription = subscription;
  await user.save();
  return user;
}

export async function updateAvatar(userId, avatarURL) {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(404, "User not found");
  user.avatarURL = avatarURL;
  await user.save();
  return user;
}