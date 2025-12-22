import express from "express";
import {
  getAllProducts,
  getProductById,
  searchByProductName,
  searchByBrand,
  searchMultiple,
  getByCategory,
  filterByPriceRange,
  filterByRating,
  sortProducts,
  paginateProducts,
  combinedFilters
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/id/:id", getProductById);
router.get("/search/name", searchByProductName);
router.get("/search/brand", searchByBrand);
router.get("/search/multi", searchMultiple);
router.get("/category", getByCategory);
router.get("/price-range", filterByPriceRange);
router.get("/rating", filterByRating);
router.get("/sort", sortProducts);
router.get("/pagination", paginateProducts);
router.get("/filters", combinedFilters); 

export default router;
