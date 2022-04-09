import { Router } from "express";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);

router.get("/status", (req, res) => {
  res.status(200).send("<h1>OK</h1>");
});

export default router;
