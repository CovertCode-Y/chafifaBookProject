import express from "express";
import { signupHandler, loginHandler, logoutHandler } from "../controllers/auth.controller";

const router = express.Router();

router.post("/auth/signup", signupHandler);
router.post("/auth/login", loginHandler);
router.post("/auth/logout", logoutHandler);

export default router;
