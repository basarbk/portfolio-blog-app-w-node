import express from "express";
import userRouter from "./user/router.js";
import ErrorHandler from "./error/handler.js";

const app = express();
app.use(express.json());
app.use(userRouter);

app.use(ErrorHandler);
export default app;
