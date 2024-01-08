import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // regex for email validation
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
