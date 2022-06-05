import "reflect-metadata";
import express from "express";
import routes from "./routes";
import cors from "cors";
import "./shared/container/index";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/v1", routes);

const serverPort = process.env.SERVER_PORT || 3333;

app.listen(serverPort);
