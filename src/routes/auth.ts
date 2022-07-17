import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      res.status(200).json({
        sessionToken: req.user,
      });
    } catch (error) {}
    res.status(200);
  }
);

export default router;
