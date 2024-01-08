import mongoose from "mongoose";

const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: [true, 'Cart ID is required']
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now 
  },
});


const cartItemModel = mongoose.model('CartItem', cartItemSchema);

export default cartItemModel;
