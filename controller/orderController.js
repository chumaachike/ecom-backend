import mongoose from 'mongoose'
import orderModel from "../models/Order";
import { isLoggedIn } from '../middlewares/authMiddleware';

class OrderController {
    async addOrder(req, res) {
        try {
            // const { user_id, total_price, order_status, shipping_address, billing_address } = req.body;
            // const newOrder = new orderModel({
            //     user_id: mongoose.Types.ObjectId(user_id),
            //     total_price,
            //     order_status,
            //     shipping_address: mongoose.Types.ObjectId(shipping_address),
            //     billing_address: mongoose.Types.ObjectId(billing_address)
            // });
            // const savedOrder = await newOrder.save();
            // res.status(200).json({
            //     message: 'Order created successfully',
            //     order: savedOrder
          //  })
        } catch (error) {
            // res.status(400).json({
            //     message: 'Error creating order',
            //     error: error.message
            // })
        }
    }
    async updateOrder(req, res) {
        try {
            const order = await orderModel.findById(req.params.orderId);
            if (!order) {
              return res.status(404).json({ message: 'Order not found' });
            }
        
            await order.updateOrder(req.body);
            res.status(200).json(order);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }

    async getAllOrdersForUser (req, res){
        try {
            const userId = req.params.userId;
        
            const orders = await orderModel.find({ user_id: userId });
        
            if (!orders) {
              return res.status(404).json({ message: 'No orders found for the user' });
            }
        
            res.status(200).json(orders);
          } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error: error.message });
          }
    }

}

export default new OrderController();