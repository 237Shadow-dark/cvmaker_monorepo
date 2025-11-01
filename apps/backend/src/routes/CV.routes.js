import {Router} from "express";
import { createCV, deleteCV, getAllCV, getCV, updateCV } from "../controllers/cv.controller.js";

const router = Router();

router.post("create-cv/:userId", createCV);

router.get("/read/:id", getCV);

router.get("/readAll/:id", getAllCV);

router.put("/update/:id", updateCV);

router.delete("/delete/:id", deleteCV);

export default router;