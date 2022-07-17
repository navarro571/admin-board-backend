import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import requireLevel from "../middleware/role-validator";
import schemaValidator from "../middleware/schema-validator";
import { createRole, updateRole } from "../schema/role.schema";
import RoleService from "../services/role.service";
import config from "./../config/config";

const router = express.Router();
const service = new RoleService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await service.get();
      res.status(200).json({
        roles: roles.rows,
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
      const roles = await service.find(+id);
      res.status(200).json({
        roles: roles.rows,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  schemaValidator(updateRole, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await service.update(req.body);
      res.status(200).json({
        roles: roles.rows,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  schemaValidator(createRole, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await service.create(req.body);
      res.status(200).json({
        roles: roles,
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
      const response = await service.delete(Number(id));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
