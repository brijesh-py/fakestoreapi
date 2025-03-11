const { Router } = require("express");
const adminController = require("../controllers/adminController");
const { authorize, protect } = require("../middlewares/protectMiddleware");
const { validate, schema } = require("../validation");

const router = Router();
const { registerSchema, loginSchema, updateSchema } = schema.userSchema;

router.post(
  "/register",
  validate(registerSchema, "body"),
  adminController.handleCreateAdmin
);
router.post(
  "/login",
  validate(loginSchema, "body"),
  adminController.handleLoginAdmin
);
router.get("/", protect, authorize("admin"), adminController.handleGetAdmin);
router.put(
  "/",
  protect,
  authorize("admin"),
  validate(updateSchema, "body"),
  adminController.handleUpdateAdmin
);
router.delete(
  "/",
  protect,
  authorize("admin"),
  adminController.handleDeleteAdmin
);

module.exports = router;
