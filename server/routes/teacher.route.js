import express from "express";
import upload from "../middlewares/multer.js";
import { uploadStudent } from "../controllers/uploadStudent.js";

const teacher = express.Router();

teacher.post("/upload-student", upload.single("imageUrl"), uploadStudent);

export default teacher;
