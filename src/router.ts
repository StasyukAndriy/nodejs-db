import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProduct, getProducts, deleteProduct, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/updates";
import { handleInputErrors } from "./modules/middleware";
const router = Router();
/**
 * Product
 */

router.get("/product", getProducts);

router.get("/product/:id", getProduct);

router.post("/product",  body('name').isString(), handleInputErrors, createProduct);

router.put("/product/:id", body('name').isString(), handleInputErrors, updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getUpdate);
 

router.post("/update",
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate);

router.put("/update/:id",
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
  body('version').optional().isString(),
  updateUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint",
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString(),
  (req, res) => {});

router.put("/updatepoint/:id", body('name').optional().isString(),
body('description').optional().isString(),
 (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;