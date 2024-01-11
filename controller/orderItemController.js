import mongoose from 'mongoose';
import orderItemModel from '../models/OrderItems';

class orderItemController {
    async addOrderItem (req, res){
        try{
            const {order_id, product_id, quantity, price_per_unit} = req.body;
            const newOrderItem = new orderItemModel({
                product_id: mongoose.Types.ObjectId(product_id),
                order_id: mongoose.Types.ObjectId(order_id),
                quantity,
                price_per_unit,
            })
            const saveOrderItem = await newOrderItem.save();
            res.status(200).json({
                message: 'Item successfully added',
                order: savedOrder
            });
        }catch(error){
            res.status(400).json({
                message: 'Error creating order',
                error: error.message
            })
        }
    }
    async updateOrderItem(req, res) {
        try {
            const itemId = req.params.itemId;
            const updateData = req.body;
    
            // First, find the order item
            const orderItem = await orderItemModel.findById(itemId);
            if (!orderItem) {
                return res.status(404).json({ message: 'Order item not found' });
            }
    
            // Assuming orderItem has a reference to the order, like 'orderId'
            const order = await OrderModel.findById(orderItem.orderId);
            if (!order) {
                return res.status(404).json({ message: 'Associated order not found' });
            }
    
            // Check if the order has been shipped
            if (order.status === 'shipped') {
                return res.status(400).json({ message: 'Cannot update item as the order has been shipped' });
            }
    
            // Proceed with the update if the order is not shipped
            const updatedItem = await orderItemModel.findByIdAndUpdate(itemId, updateData, { new: true });
            res.status(200).json({
                message: 'Item updated successfully',
                item: updatedItem
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order item', error: error.message });
        }
    }
    
}

export default new orderItemController();