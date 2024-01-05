const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Define a schema for your data
const Schema = mongoose.Schema;
const userSchema = new Schema({
  user_id: {type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true },
});



userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Create a model based on the schema
const userModel = mongoose.model('Example', userSchema);

// Export the model to use it in other parts of your application
module.exports = userModel;
