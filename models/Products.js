const mongoose = require('mongoose');

// Define a schema for your data
const Schema = mongoose.Schema;
const productSchema = new Schema({
  product_id: Number,
  name: String,
  description: String,
  price: Number,
  image_url: String,
});

// Create a model based on the schema
const productModel = mongoose.model('Example', productSchema);

// Export the model to use it in other parts of your application
module.exports = productModel;
