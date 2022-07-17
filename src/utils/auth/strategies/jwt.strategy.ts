import { Strategy, ExtractJwt } from "passport-jwt";
import config from "../../../config/config";
import UserService from "../../../services/user.service";

const service = new UserService();

const JWTStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (payload, done) => {
    try {
        const user = await service.find(payload.sub);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

export default JWTStrategy;