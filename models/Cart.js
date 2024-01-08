import mongoose from "mongoose";

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  session_id: {
    type: String,
    required: [true, 'Session ID is required']
  },
  total_price: {
    type: Number,
    min: [0, 'Total price cannot be negative'],
    default: 0 
  },
},{
  timestamps: true,
});

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
