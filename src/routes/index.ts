import express, { Express, Router } from "express";
import users from "./users";
import roles from "./roles";
import auth from "./auth";

const cors = require('cors');
function router(app: Express) {
    app.use(cors())
    const router: Router = express.Router()
    app.use("/api/v1", router);
    router.use("/users", users);
    router.use("/roles", roles);
    router.use("/auth", auth);
}

export default router;