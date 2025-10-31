import express from "express";
// import pkg from '@prisma/client';
import { deleteUser, getUser, login, logout, signup, updateUser } from "../controllers/auth.controller.js";
import passport from "../controllers/google_auth.controller.js";
import { generateToken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// const { PrismaClient } = pkg;

// const prisma = new PrismaClient();
const router = express.Router();


router.post("/signup",signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update/:id",protectRoute, updateUser);

router.delete("/delete/:id",protectRoute, deleteUser);

router.get("/user", getUser);

// Callback après authentification
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user.id, res);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
)


// Démarrer le login Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default router;