import categoryModel from "../models/Category";

class CategoryController {
    async addCategory(req, res){
        const {name, description, parentCategory, imageUrl, slug} = req.body;
        try{
            const newCategory = new categoryModel ({name, description, parentCategory, imageUrl, slug});
            await newCategory.save();
            res.status(200).send(`${newCategory.name} has been successfully added`);
        }catch(error){
            res.status(500).send(err.message);
        }
    }
    async deleteCategory(req, res){
        const categoryId = req.params.id;
        try{
            const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
            if (deletedCategory){
                res.status(200).send(`${deletedCategory.name} has been succesfully deleted`)
            }else{
                res.status(400).send('Category not found');
            }
        }catch (err){
            res.status(500).send(err.message);
        }
    }
    async getAllCategories(req, res){
        try{
            const allCategories = await categoryModel.find({});
            res.send(allCategories)
        }catch(err){
            res.status.send(err.message)
        }
    }
    async getCategoryByID(req, res){
        try{
            const category = await categoryModel.findById(req.params.id);
            if(category){
                res.status(200).send(category);
            }else{
                res.status(400).send("category not found")
            }
        }catch (err){
            res.status(500).send(err.message);
        }
        

    }
    async updateCategory(req, res){
        try{
            const productId = req.params.id;
            const newCategoryData = req.params.id;

            const updatedCategory = await categoryModel.findByIdAndUpdate(productId, newCategoryData, {new: true});
            if (updatedCategory){
                return res.status(404).send("Category not found");
            }
            res.send(updatedCategory);
        }catch (err){
            res.status(400).send(err.message);
        }      
    }

}

export default new CategoryController();