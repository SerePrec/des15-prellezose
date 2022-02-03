import { Router } from "express";
import { validateRegisterPost } from "../middlewares/validateWebData.js";
import {
  passportAuthLogin,
  passportAuthRegister
} from "../middlewares/passport.js";
import * as controller from "../controllers/authController.js";

const router = Router();

router.get("/login", controller.getLogin);

router.post("/login", passportAuthLogin);

router.get("/login-error", controller.getLoginError);

router.get("/register", controller.getRegister);

router.post("/register", validateRegisterPost, passportAuthRegister);

router.get("/register-error", controller.getRegisterError);

router.get("/logout", controller.getLogout);

export default router;
