import express from "express";
import userRouter from "./user/router.js";
import ErrorHandler from "./error/handler.js";
import authRouter from "./auth/router.js";
import cookieParser from "cookie-parser";
import articleRouter from "./articles/router.js";
import fileRouter from "./file/router.js";
import { ONE_YEAR_IN_MILLIS } from "./shared/constant.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  "/api/assets",
  express.static("./upload", { maxAge: ONE_YEAR_IN_MILLIS }),
);
app.use(userRouter);
app.use(authRouter);
app.use(articleRouter);
app.use(fileRouter);
app.use(ErrorHandler);
export default app;
