import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import v1Routes from "../routes/v1";
import error from "../middlewares/error";

export default (app: Express) => {
  app.use(express.json());
  app.use(cors());
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use("/api/v1", v1Routes);
  app.use(error);
};
