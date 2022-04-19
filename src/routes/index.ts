import { Router } from "express";
import userRouter from "./user";
// import adsRouter from "./ads";

const router = Router();

router.use("/user", userRouter);
// router.use("/ads", adsRouter);

router.get("/status", (req, res) => {
  res.status(200).send("<h1>OK</h1>");
});

router.all("*", (req, res) => {
  return res.status(404).json("404 Not Found");
});

export default router;
