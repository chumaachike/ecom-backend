const mongoose = require('mongoose');

// Define a schema for your data
const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
  order_item_id: Number,
  order_id: Number,
  product_id: Number,
  quantity: Number,
});

// Create a model based on the schema
const orderItemModel = mongoose.model('Example', orderItemSchema);

// Export the model to use it in other parts of your application
module.exports = orderItemModel;
