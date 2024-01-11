import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxlength: [50, 'Category name should not exceed 50 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, 'Description should not exceed 200 characters']
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false // Only required for subcategories
    },
    imageUrl: {
        type: String,
        required: false, // URL to an image representing the category
        match: [/^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp)$/, 'Please enter a valid image URL'] // regex for validating image URL
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true,
        lowercase: true, // Convert slug to lowercase
        match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'] // regex for validating slug format
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;
