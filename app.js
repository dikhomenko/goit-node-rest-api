import passport from "passport";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import path from "path";

import "./db/sequelize/sequelize.js";
import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();

app.use(passport.initialize());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(path.join(process.cwd(), "public", "avatars")));
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = process.env.BASE_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
