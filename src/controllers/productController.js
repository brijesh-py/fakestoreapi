const productService = require("../services/productService");
const { asyncWrapper, response } = require("../utils");

class ProductController {
  handleCreateProductAdmin = asyncWrapper(async (req, res) => {
    const { title, description, price, stocks, image, category } = req.body;
    const product = await productService.create({
      title,
      description,
      price,
      stocks,
      image,
      category,
    });
    return response(res, { statusCode: 201, product });
  });

  handleUpdateProductAdmin = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, image, category } = req.body;
    const product = await productService.update(id, {
      title,
      description,
      price,
      image,
      category,
    });
    return response(res, { statusCode: 200, product });
  });

  handleDeleteProductAdmin = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await productService.destroy(id);
    return response(res, { statusCode: 200 });
  });

  handleGetAllProducts = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10, query = "", category = "" } = req.query;
    const { products, count } = await productService.getAllProducts({
      query,
      category,
      page,
      limit,
    });
    response(res, { statusCode: 200, products, count });
  });

  handleGetProduct = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProduct(id);
    return response(res, { statusCode: 200, product });
  });
}

module.exports = new ProductController();
