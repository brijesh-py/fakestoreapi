const httpStatusCode = require("./httpStatusCode");

const ERRORS = {
  SERVER_ERROR: "Server error",
  NOT_FOUND: "Not found",
  CONFLICT: "Conflict",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
};

const USER_MESSAGES = {
  CREATION_FAILED: {
    message: "User creation failed",
    error: ERRORS.SERVER_ERROR,
    statusCode: httpStatusCode.SERVER_ERROR,
  },
  NOT_FOUND: (key, value) => ({
    message: `User with ${key} '${value}' not found`,
    error: ERRORS.NOT_FOUND,
    statusCode: httpStatusCode.NOT_FOUND,
  }),
  CONFLICT_USER: (prop) => ({
    message: `User with '${prop}' already exists`,
    error: ERRORS.CONFLICT,
    statusCode: httpStatusCode.CONFLICT,
  }),
  INVALID_TOKEN: {
    message: "Invalid or expired token",
    error: ERRORS.BAD_REQUEST,
    statusCode: httpStatusCode.BAD_REQUEST,
  },
  INVALID_CREDENTIALS: {
    message: "Invalid credentials",
    error: ERRORS.BAD_REQUEST,
    statusCode: httpStatusCode.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    message: "Unauthorized request",
    error: ERRORS.UNAUTHORIZED,
    statusCode: httpStatusCode.UNAUTHORIZED,
  },
  CREATED: "User created successfully",
  VERIFIED: "User verified successfully",
  LOGGED_IN: "User logged in successfully",
  LOGGED_OUT: "User logged out successfully",
  UPDATED: "User updated successfully",
  DELETED: "User deleted successfully",
  FORGOT_PASSWORD: "Password reset link sent successfully",
  RESET_PASSWORD: "Password reset successfully",
  CHANGE_PASSWORD: "Password changed successfully",
  EMAIL_SENT: "Email sent successfully",
};

const PRODUCT_MESSAGES = {
  NOT_FOUND: (prop) => ({
    message: `Product with ID '${prop}' not found`,
    error: ERRORS.NOT_FOUND,
    statusCode: httpStatusCode.NOT_FOUND,
  }),
};

const CART_MESSAGES = {
  NOT_FOUND: (key, prop) => ({
    message: `Cart with ${key} '${prop}' not found`,
    error: ERRORS.NOT_FOUND,
    statusCode: httpStatusCode.NOT_FOUND,
  }),
};

module.exports = {
  ERRORS,
  USER_MESSAGES,
  PRODUCT_MESSAGES,
  CART_MESSAGES,
};
