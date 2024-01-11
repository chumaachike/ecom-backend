import express from "express";
import orderController from "../controller/orderController";

const router = express.Router();

router.post('/add-order', orderController.addOrder);
router.put('/update-order', orderController.updateOrder);
router.get('/get-orders', orderController.getAllOrdersForUser);

export default router;