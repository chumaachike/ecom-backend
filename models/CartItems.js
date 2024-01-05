const mongoose = require('mongoose');

// Define a schema for your data
const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
  cart_item_id: Number,
  cart_id: Number,
  product_id: Number,
  quantity: Number,
});

// Create a model based on the schema
const cartItemModel = mongoose.model('Example', cartItemSchema);

// Export the model to use it in other parts of your application
module.exports = cartItemModel;
