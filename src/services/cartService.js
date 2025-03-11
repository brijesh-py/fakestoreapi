const Cart = require("../models/Cart");
const { DBError } = require("../utils");
const { CART_MESSAGES } = require("../constants/messages");

class CartService {
  sanitize(cart) {
    return {
      id: cart._id,
      userId: cart.userId,
      products: cart.products,
    };
  }

  async getAllCarts({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;

    const carts = await Cart.find()
      .populate("userId")
      .populate("products.productId")
      .limit(limit)
      .skip(offset);
    return {
      carts: carts.map((cart) => this.sanitize(cart)),
      count: carts.length,
    };
  }

  async getCart(userId) {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      throw new DBError(CART_MESSAGES.NOT_FOUND("userId", userId));
    }
    return cart.products.map((item) => ({
      ...item.productId.toJSON(),
      id: item.productId._id,
      quantity: item.quantity,
      _id: undefined,
      __v: undefined,
    }));
  }

  async create(userId, { productId, quantity }) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (productIndex === -1) {
      cart.products.push({ productId, quantity });
    } else {
      cart.products[productIndex].quantity = quantity;
    }
    await cart.save();
    return this.sanitize(cart);
  }

  async update(userId, { productId, quantity }) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new DBError(CART_MESSAGES.NOT_FOUND("id", id));
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (productIndex === -1) {
      throw new DBError(CART_MESSAGES.NOT_FOUND("productId", productId));
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return this.sanitize(cart);
  }

  async destroy(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new DBError(CART_MESSAGES.NOT_FOUND("id", id));
    }
    await Cart.findByIdAndDelete(cart._id);
    return { success: true };
  }
}

module.exports = new CartService();
