import express from "express";
import {
  getAllCategories,
  getCategoriesByType,
  updateCategoriesByType,
  resetCategoriesByType,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories);
router
  .route("/:type")
  .get(getCategoriesByType)
  .put(updateCategoriesByType);
router.route("/:type/reset").post(resetCategoriesByType);

export default router;

