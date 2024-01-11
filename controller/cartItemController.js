import cartItemModel from "../models/CartItems";
class CartItemController {
    async addCartItem(req, res){
        const {cart_id, product_id, price, quantity} = req.body;
        try{
            const newCartItem = new cartItemModel ({cart_id, product_id, price, quantity});
            await newCartItem.save();
            res.status(200).send(`${newCartItem.name} has been successfully added`);
        }catch(error){
            res.status(500).send(err.message);
        }
    }
    async deleteCartItem(req, res){
        const cartItemId = req.params.id;
        try{
            const deletedCartItem = await cartItemModel.findByIdAndDelete(cartItemId);
            if (deletedCartItem){
                res.status(200).send(`${deletedCartItem.name} has been succesfully deleted`)
            }else{
                res.status(400).send('Category not found');
            }
        }catch (err){
            res.status(500).send(err.message);
        }
    }
    async getCartItemById(req, res){
        try{
            const cartItem = await cartItemModel.findById(req.params.id);
            if(cartItem){
                res.status(200).send(cartItem);
            }else{
                res.status(400).send("Cart item not found")
            }
        }catch (err){
            res.status(500).send(err.message);
        }
        

    }
    async updateCartItemById(req, res){
        try{
            const cartItemId = req.params.id;
            const newCartItem = req.body;

            const updatedCartItem = await cartItemModel.findByIdAndUpdate(cartItemId, newCartItem, {new: true});
            if (updatedCartItem){
                return res.status(404).send("Cart Item not found");
            }
            res.send(updatedCartItem);
        }catch (err){
            res.status(400).send(err.message);
        }      
    }

}

export default new CartItemController();