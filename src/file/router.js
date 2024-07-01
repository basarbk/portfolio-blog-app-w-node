import { Router } from "express";
import multer from "multer";
import ValidationException from "../error/ValidationException.js";
import config from "config";
import { join } from "path";
const fileRouter = new Router();

const ONE_MB = 1024 * 1024;

const upload = multer({
  dest: join(".", config.get("uploadDir")),
  limits: { fileSize: ONE_MB },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return callback(null, true);
    }
    callback(new Error("Unsupported file type"), false);
  },
}).single("file");

fileRouter.post("/api/file/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(
        new ValidationException({
          file: "Uploaded file can only be jpeg or png and must be less than 1MB",
        }),
      );
    }
    res.status(201).send({ filename: req.file.filename });
  });
});

export default fileRouter;
