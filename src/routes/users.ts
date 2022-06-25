import express, { Express, NextFunction, Request, response, Response } from "express";
import UserService from "../services/user.service";

const router = express.Router();
const service = new UserService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.get();
    res.status(200).json({
      users: users.rows
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await service.find(+id);
    res.status(200).json({
      user: user.rows
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.create(req.body);
    res.status(200).json({
      user: user
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    next(e);
  }
});

export default router;
