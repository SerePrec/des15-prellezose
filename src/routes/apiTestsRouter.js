import { Router } from "express";
import * as controller from "../controllers/apiTestsController.js";

const router = Router();

router.get("/productos-test", controller.getProductosTest);

export default router;
