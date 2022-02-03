import { Router } from "express";
import {
  validateId,
  validatePostBody,
  validatePutBody
} from "../middlewares/validateApiData.js";
import * as controller from "../controllers/apiProductosController.js";

const router = Router();

router.get("/", controller.getAllProducts);

router.post("/", validatePostBody, controller.createProduct);

router.get("/:id", validateId, controller.getProduct);

router.put("/:id", validateId, validatePutBody, controller.updateProduct);

router.delete("/:id", validateId, controller.deleteProduct);

export default router;
