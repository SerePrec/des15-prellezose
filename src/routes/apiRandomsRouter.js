import { Router } from "express";
import * as controller from "../controllers/apiRandomsController.js";

const router = Router();

router.get("/", controller.getRandoms);

export default router;
