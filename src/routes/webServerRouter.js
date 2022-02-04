import { Router } from "express";
import { isAuthWeb } from "../middlewares/auth.js";
import * as controller from "../controllers/webServerController.js";

const router = Router();

router.get("/", isAuthWeb, controller.getHome);

router.get("/info", controller.showAppInfo);

router.get("/productos-mock", controller.getProductosMock);

export default router;
