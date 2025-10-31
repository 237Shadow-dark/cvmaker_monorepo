import {Router} from "express";
import { createCV, deleteCV, getCV, updateCV } from "../controllers/cv.controller.js";

const router = Router();

router.post("create-cv", createCV);

router.get("/read/:id", getCV);

router.put("/update/:id", updateCV);

router.delete("/delete/:id", deleteCV);

export default router;