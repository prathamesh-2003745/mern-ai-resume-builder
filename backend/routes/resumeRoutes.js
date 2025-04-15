import express from "express";
import { generateResumeFromGemini } from "../controllers/resumeController.js";

const router = express.Router();
router.post("/generate", generateResumeFromGemini);

export default router;
