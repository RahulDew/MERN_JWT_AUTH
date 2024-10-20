import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

const router = Router();

router.get("/protected", verifyToken, (req: CustomRequest, res: Response) => {
  console.log(req.user);
  res.json({ message: "Authorized Route", user: req.user });
});

export default router;
