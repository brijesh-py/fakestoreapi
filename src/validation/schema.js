const zod = require("zod");

const name = zod
  .string({ message: "Name is require" })
  .min(3, "Name must be at least 3 characters")
  .max(20, "Name must be at most 20 characters");
const username = zod.string({
  required_error: "Username is required",
  invalid_type_error: "Username must be a string",
});
const password = zod
  .string({
    required_error: "Password is required",
  })
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be at most 20 characters");
const email = zod
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email("Invalid email format");

const registerSchema = zod.object({
  name,
  username,
  email,
  password,
});

const loginSchema = zod.object({
  username,
  password,
});

const updateSchema = zod.object({
  name: name.optional(),
  username: username.optional(),
  email: email.optional(),
});

const userSchema = { registerSchema, loginSchema, updateSchema };

const id = zod
  .string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  })
  .min(24, "Id must be at least 24 characters")
  .max(24, "Id must be at most 24 characters");
const idSchema = zod.object({ id });

const title = zod
  .string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  })
  .min(3, "Title must be at least 3 characters")
  .max(20, "Title must be at most 20 characters");
const description = zod
  .string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  })
  .min(3, "Description must be at least 3 characters")
  .max(100, "Description must be at most 100 characters");
const price = zod
  .number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  })
  .min(0, "Price must be at least 0");
const stocks = zod
  .number({
    required_error: "Stocks is required",
    invalid_type_error: "Stocks must be a number",
  })
  .min(0, "Stocks must be at least 0");
const image = zod
  .string({
    required_error: "Image is required",
    invalid_type_error: "Image must be a string",
  })
  .min(3, "Image must be at least 3 characters")
  .max(100, "Image must be at most 100 characters");
const category = zod
  .string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  })
  .min(3, "Category must be at least 3 characters")
  .max(20, "Category must be at most 20 characters");

const createProductSchema = zod.object({
  title,
  description,
  price,
  stocks,
  image,
  category,
});

const updateProductSchema = zod.object({
  title: title.optional(),
  description: description.optional(),
  price: price.optional(),
  stocks: stocks.optional(),
  image: image.optional(),
  category: category.optional(),
});

const productSchema = {
  createProductSchema,
  updateProductSchema,
};

const createCartSchema = zod.object({
  productId: id,
  quantity: zod
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be at least 1"),
});

const updateCartSchema = zod.object({
  productId: id,
  quantity: zod
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be at least 1"),
});

const cartSchema = { createCartSchema, updateCartSchema };

module.exports = { userSchema, productSchema, idSchema, cartSchema };
