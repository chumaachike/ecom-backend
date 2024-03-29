import productModel from "../models/Products.js";

class ProductController {
    async addProduct(req, res) {
        const { name, description, price, image_url, quantity } = req.body;
        try {
            // Await the save operation
            const newProduct = new productModel({ name, description, price, image_url, quantity });
            await newProduct.save();
            res.status(200).send(`${newProduct.name} has been successfully added`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteProduct(req, res) {
        const  product_id  = req.params.id;
        try {
            // Await the delete operation
            const deletedProduct = await productModel.findByIdAndDelete(product_id);
            if (deletedProduct) {
                res.status(200).send(`${deletedProduct.name} has been successfully deleted`);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getProducts(req, res) {
        try {
            const allProducts = await productModel.find({});
            res.send(allProducts);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
    
    async findProductsByName(req, res){
        const name  = req.query.name;
        try {
            // Using a regular expression for a flexible match
            const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
            const products = await productModel.find({ name: regex });
    
            if (products && products.length > 0) {
                res.status(200).send(products);
            } else {
                res.status(400).send('No product was found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getProductById (req, res){
        const {id} = req.params;
        try{
            const product = await productModel.findById(id);
            if (product){
                res.status(200).send(product);
            }else{
                res.status(400).send("Product not found");
            }
        }catch(err){
            res.status(500).send(err.message);
        }
    }

}

export default new ProductController();
