const { Router } = require("express");
const userController = require("../controllers/userController");
const { validate, schema } = require("../validation");
const { authorize, protect } = require("../middlewares/protectMiddleware");

const router = Router();
const { registerSchema, loginSchema, updateSchema } = schema.userSchema;

router.post(
  "/register",
  validate(registerSchema, "body"),
  userController.handleCreateUser
);
router.post(
  "/login",
  validate(loginSchema, "body"),
  userController.handleLoginUser
);
router.put(
  "/",
  protect,
  validate(updateSchema, "body"),
  userController.handleUpdateUser
);
router.delete("/", protect, userController.handleDeleteUser);
router.get("/me", protect, userController.handleGetUser);
router.get("/logout", protect, userController.handleLogoutUser);
router.get(
  "/users",
  protect,
  authorize("admin"),
  userController.handleGetAllUsers
);

module.exports = router;
