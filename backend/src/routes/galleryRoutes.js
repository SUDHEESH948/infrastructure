import express from "express";
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.route("/").get(getGalleryItems).post(createGalleryItem);
router.route("/:id").delete(deleteGalleryItem);

export default router;

