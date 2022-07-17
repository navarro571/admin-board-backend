import passport from "passport";
import JWTStrategy from "./jwt.strategy";
import LocalStrategy from "./local.strategy";

passport.use(LocalStrategy);
passport.use(JWTStrategy);