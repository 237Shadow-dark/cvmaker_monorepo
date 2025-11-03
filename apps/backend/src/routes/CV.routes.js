// import {Router, express} from "express";
import express from "express";
import { createCV, deleteCV, getAllCV, getCV, updateCV } from "../controllers/cv.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("CV Router is working!");
});

router.post("/create/:userId", createCV);

router.get("/read/:id", getCV);

router.get("/readAll/:id", getAllCV);

router.put("/update/:id", updateCV);

router.delete("/delete/:id", deleteCV);

export default router;