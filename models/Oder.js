import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  total_price: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  order_status: {
    type: String,
    required: [true, 'Order status is required'],
    enum: ['pending', 'completed', 'cancelled', 'processing', 'shipped'], 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  shipping_address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Shipping address is required']
  },
  billing_address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: [true, 'Billing address is required']
  },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
