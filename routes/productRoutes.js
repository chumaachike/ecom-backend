import express from "express";
import productController from "../controller/productController.js";

const router = express.Router();

router.post('/add-product', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/products', productController.getProducts); // Keep as is
router.get('/search', productController.findProductsByName); // Use query params, e.g., /products/search?name=productName
router.get('/:id', productController.getProductById); // To fetch by ID

export default router;