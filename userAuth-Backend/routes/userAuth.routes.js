import express from "express";

const router = express.Router();

import {
  dashboard,
  home,
  login,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

router.get("/", home);
router.post("/signup", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/dashboard", isLoggedIn, dashboard);

router.post("/resetpassword", isLoggedIn, resetPassword);

export default router;
