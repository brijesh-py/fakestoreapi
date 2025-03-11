const Product = require("../models/Product");
const { DBError } = require("../utils");
const { PRODUCT_MESSAGES } = require("../constants/messages");

class ProductService {
  async sanitize(product) {
    return {
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      stocks: product.stocks,
      category: product.category,
    };
  }

  async getAllProducts({ query = "", category = "", page = 1, limit = 10 }) {
    const regex = new RegExp(query, "i");
    const offset = (page - 1) * limit;

    const where = {};
    if (query) {
      where.$or = [{ title: regex }, { description: regex }];
    }

    if (category) {
      where.category = category;
    }

    const products = await Product.find(where).limit(limit).skip(offset);

    return {
      products: products.map((product) => ({
        ...product.toJSON(),
        id: product._id,
        _id: undefined,
        __v: undefined,
      })),
      count: products.length,
    };
  }

  async getProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new DBError(PRODUCT_MESSAGES.NOT_FOUND(id));
    }
    return this.sanitize(product);
  }

  async create(productData) {
    const product = await Product.create(productData);
    return this.sanitize(product);
  }

  async update(id, productData) {
    const product = await Product.findById(id);
    if (!product) {
      throw new DBError(PRODUCT_MESSAGES.NOT_FOUND(id));
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    return this.sanitize(updatedProduct);
  }

  async destroy(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new DBError(PRODUCT_MESSAGES.NOT_FOUND(id));
    }
    await Product.findByIdAndDelete(id);
    return { success: true };
  }
}
module.exports = new ProductService();
