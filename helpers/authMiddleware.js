import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../db/sequelize/Users.js";
import "dotenv/config";

const secret = process.env.JWT_SECRET;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

passport.use(
  new JwtStrategy(params, async (req, payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      const incomingToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      console.log("incoming TOKEN:", incomingToken);
      console.log("user TOKEN:", user?.token);
      if (!user || user.token !== incomingToken) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

console.log("AUTH MIDDLEWARE LOADED"); 
export default authMiddleware;