import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  addressLine1: {
    type: String,
    required: [true, 'Address line 1 is required'],
    trim: true,
    maxlength: [100, 'Address line 1 should not exceed 100 characters']
  },
  addressLine2: {
    type: String,
    trim: true,
    maxlength: [100, 'Address line 2 should not exceed 100 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City should not exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    maxlength: [50, 'State should not exceed 50 characters']
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true,
    //match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid postal code'] // regex pattern for US postal code
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country should not exceed 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?([0-9]{1,3})?[-. ]?(\([0-9]{1,3}\)|[0-9]{1,3})[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,4}$/, 'Please enter a valid phone number'] // regex pattern for phone number
  },
  isDefault: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
