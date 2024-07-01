import express from "express";
import userRouter from "./user/router.js";
import ErrorHandler from "./error/handler.js";
import authRouter from "./auth/router.js";
import cookieParser from "cookie-parser";
import articleRouter from "./articles/router.js";
import fileRouter from "./file/router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(authRouter);
app.use(articleRouter);
app.use(fileRouter);
app.use(ErrorHandler);
export default app;
