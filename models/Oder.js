const mongoose = require('mongoose');

// Define a schema for your data
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  order_id: Number,
  user_id: Number,
  total_price: Number,
  status: String,
});

// Create a model based on the schema
const cartModel = mongoose.model('Example', cartSchema);

// Export the model to use it in other parts of your application
module.exports = cartModel;
