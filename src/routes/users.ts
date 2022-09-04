import express, { Express, NextFunction, Request, Response } from "express";
import passport from "passport";
import UserData from "../interfaces/services/user";
import requireLevel from "../middleware/role-validator";
import schemaValidator from "../middleware/schema-validator";
import { createUser, updateUser } from "../schema/user.schema";
import UserService from "../services/user.service";
import config from "./../config/config";

const router = express.Router();
const service = new UserService();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await service.get();
      res.status(200).json({
        users: users.rows,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = <UserData>await service.find(+id);
      delete user.password;
      delete user.recovery_token;
      res.status(200).json({
        user: user,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  schemaValidator(updateUser, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await service.update(req.body);
      res.status(200).json({
        user: user.rows,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  schemaValidator(createUser, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await service.create(req.body);
      res.status(200).json({
        user: user,
        statusCode: 200
      });
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requireLevel(config.roles.ADMIN),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await service.delete(+id);
      res.status(200).json({
        response,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
