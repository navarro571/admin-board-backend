import express, { Express, NextFunction, Request, response, Response } from "express";
import RoleService from "../services/role.service";

const router = express.Router();
const service = new RoleService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await service.get();
    res.status(200).json({
      roles: roles.rows
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const roles = await service.find(+id);
    res.status(200).json({
      roles: roles.rows
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await service.update(req.body);
    res.status(200).json({
      roles: roles.rows
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await service.create(req.body);
    res.status(200).json({
      roles: roles
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const roles = service.delete(Number(id));
    res.status(200).json({
      roles: roles
    });
  } catch (e) {
    next(e);
  }
});

export default router;
