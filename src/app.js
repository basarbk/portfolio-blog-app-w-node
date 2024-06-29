import express from "express";
import userRouter from "./user/router.js";
import ErrorHandler from "./error/handler.js";
import authRouter from "./auth/router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(authRouter);
app.use(ErrorHandler);
export default app;
