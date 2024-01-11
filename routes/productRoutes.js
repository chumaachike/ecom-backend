import express from "express";
import productController from "../controller/productController.js";

const router = express.Router();

router.post('/add-product', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/products', productController.getProducts);
router.get('/get-product', productController.findProductsByName);
router.get('/get-product/:id', productController.getProductById);

export default router;