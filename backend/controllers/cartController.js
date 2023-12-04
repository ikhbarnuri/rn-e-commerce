const Cart = require('../models/Cart');

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem,
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ cartItem, quantity });
        }

        await cart.save();
        res.status(200).json('product added to cart');
      } else {
        const newCart = new Cart({
          userId,
          products: [
            {
              cartItem,
              quantity: quantity,
            },
          ],
        });

        await newCart.save();
        res.status(200).json('product added to cart');
      }
    } catch (e) {
      res.status(500);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id;

    try {
      const cart = await Cart.find({ userId })
        .populate('products.cartItem', '_id title supplier price imageUrl');

      res.status(200).json(cart);
    } catch (e) {
      res.status(500);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItem;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { 'products._id': cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true },
      );

      if (!updatedCart) {
        return res.status(404).json({ message: 'cart item not found' });
      }

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'failed to delete cart item' });
    }
  },

  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;

    try {
      const cart = Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json('cart not found');
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem,
      );

      if (!existingProduct) {
        return res.status(404).json('product not found');
      }

      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem,
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne(
          { userId },
          { $pull: { products: { cartItem } } },
        );
      }

      res.status(200).json('product updated');
    } catch (e) {
      res.status(500);
    }
  },
};