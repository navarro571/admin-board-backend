import express, { Express, Router } from "express";
import users from "./users";

function router(app: Express) {
    const router: Router = express.Router()
    app.use("/api/v1", router);
    router.use("/users", users);
}

export default router;