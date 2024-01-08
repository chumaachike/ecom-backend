import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name should not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [500, 'Product description should not be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price cannot be negative']
  },
  image_url: {
    type: String,
    required: [true, 'Product image URL is required'],
    trim: true,
    match: [/^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp)$/, 'Please enter a valid image URL'] // regex for validating image URL
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [0, 'Product quantity cannot be negative'],
    default: 0
  },
});


const productModel = mongoose.model('Product', productSchema);

export default productModel;
