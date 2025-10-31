import express from "express";
import Auth_router from './routes/auth.routes.js';
import "dotenv/config";
import passport from "./controllers/google_auth.controller.js";
import session from "express-session";
import cookieparser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
import CV_router from "./routes/CV.routes.js";

const app = express();
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieparser());
// // Démarrer le login Google
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Callback après authentification
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard"); // ou renvoie un JWT
//   }
// );

app.use('/api/auth', Auth_router);
app.use('/api/cv',protectRoute, CV_router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
