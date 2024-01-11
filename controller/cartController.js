import cartModel from "../models/Cart";

class CartController {
    async addCart(req, res) {
        const { user, session_id,total_price } = req.body; 
        try {
            const newCart = new cartModel({ user, session_id,total_price });
            await newCart.save();
            res.status(200).send(`Cart successfully created`);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteCart(req, res) {
        const cartId = req.params.id;
        try {
            const deletedCart = await cartModel.findByIdAndDelete(cartId);
            if (deletedCart) {
                res.status(200).send(`Cart has been successfully deleted`);
            } else {
                res.status(400).send('Cart not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getCartById(req, res) {
        try {
            const cart = await cartModel.findById(req.params.id);
            if (cart) {
                res.status(200).send(cart);
            } else {
                res.status(400).send("Cart not found");
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateCartById(req, res) {
        try {
            const cartId = req.params.id;
            const newCartDetails = req.body;

            const updatedCart = await cartModel.findByIdAndUpdate(cartId, newCartDetails, { new: true });
            if (!updatedCart) {
                return res.status(404).send("Cart not found");
            }
            res.send(updatedCart);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

export default new CartController();
