const { Router } = require("express");
const cartController = require("../controllers/cartController");

const { authorize } = require("../middlewares/protectMiddleware");
const { validate, schema } = require("../validation");
const { createCartSchema, updateCartSchema } = schema.cartSchema;

const router = Router();

router.post(
  "/",
  validate(createCartSchema, "body"),
  cartController.handleCreateCart
);
router.get("/", cartController.handleGetCart);
router.put(
  "/",
  validate(updateCartSchema, "body"),
  cartController.handleUpdateCart
);
router.delete("/", cartController.handleDeleteCart);
router.get("/all", authorize("admin"), cartController.handleGetAllCarts);

module.exports = router;
