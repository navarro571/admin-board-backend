import { Strategy } from "passport-local";
import UserService from "./../../../services/user.service";

const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: "email",
    passwordField: "password"
}, async (username, password, done) => {
    try {
        const user = await service.tryLogin(username, password);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default LocalStrategy;