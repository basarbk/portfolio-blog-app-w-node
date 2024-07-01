import { Router } from "express";
import multer from "multer";

const fileRouter = new Router();

const upload = multer({
  dest: "./upload",
}).single("file");

fileRouter.post("/api/file/upload", upload, (req, res) => {
  res.status(201).send({ filename: req.file.filename });
});

export default fileRouter;
