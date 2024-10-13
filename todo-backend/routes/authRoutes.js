import express from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";

const router = express.Router();

// SignIn route
router.post("/signin", signIn);
// SignUp route
router.post("/signup", signUp);
// SignOut route
router.get("/signout", signOut);

export default router;
