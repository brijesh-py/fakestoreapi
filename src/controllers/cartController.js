const cartService = require("../services/cartService");
const { asyncWrapper, response } = require("../utils");

class CartController {
  handleCreateCart = asyncWrapper(async (req, res) => {
    const { id: userId } = req.auth;
    const { productId, quantity } = req.body;
    const cart = await cartService.create(userId, { productId, quantity });
    return response(res, { statusCode: 201, cart });
  });

  handleGetCart = asyncWrapper(async (req, res) => {
    const { id: userId } = req.auth;
    const cart = await cartService.getCart(userId);
    return response(res, { statusCode: 200, cart });
  });

  handleUpdateCart = asyncWrapper(async (req, res) => {
    const { id:userId } = req.auth;
    const cartData = req.body;
    const updatedCart = await cartService.update(userId, cartData);
    return response(res, { statusCode: 200, cart: updatedCart });
  });

  handleDeleteCart = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await cartService.destroy(id);
    return response(res, { statusCode: 200 });
  });

  handleGetAllCarts = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { carts, count } = await cartService.getAllCarts({ page, limit });
    return response(res, { statusCode: 200, carts, count });
  });
}

module.exports = new CartController();
