const { Router } = require("express");
const productController = require("../controllers/productController");
const { authorize, protect } = require("../middlewares/protectMiddleware");
const { validate, schema } = require("../validation");

const router = Router();

const { createProductSchema, updateProductSchema } = schema.productSchema;

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createProductSchema, "body"),
  productController.handleCreateProductAdmin
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(schema.idSchema, "params"),
  validate(updateProductSchema, "body"),
  productController.handleUpdateProductAdmin
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  validate(schema.idSchema, "params"),
  productController.handleDeleteProductAdmin
);

router.get("/", productController.handleGetAllProducts);
router.get(
  "/:id",
  validate(schema.idSchema, "params"),
  productController.handleGetProduct
);

module.exports = router;
