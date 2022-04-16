import { Router } from "express";
import userRouter from "./user";
// import adsRouter from "./ads";

const router = Router();

router.use("/user", userRouter);
// router.use("/ads", adsRouter);

router.get("/status", (req, res) => {
  res.status(200).send("<h1>OK</h1>");
});

export default router;
