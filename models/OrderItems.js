import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price_per_unit: {
    type: Number,
    required: [true, 'Price per unit is required'],
    min: [0, 'Price per unit cannot be negative']
  },
  total_price: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
});

orderItemSchema.pre('save', function(next) {
  if (!this.isModified('quantity') && !this.isModified('price_per_unit')) {
    return next();
  }

  this.total_price = this.quantity * this.price_per_unit;
  next();
});


const orderItemModel = mongoose.model('OrderItem', orderItemSchema);

export default orderItemModel;
