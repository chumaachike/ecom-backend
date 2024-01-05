const mongoose = require('mongoose');

// Define a schema for your data
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  cart_id: Number,
  user_id: Number,
});

// Create a model based on the schema
const cartModel = mongoose.model('Example', cartSchema);

// Export the model to use it in other parts of your application
module.exports = cartModel;
