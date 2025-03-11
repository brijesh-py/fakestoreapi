const jwt = require("jsonwebtoken");
const { asyncWrapper, AuthError } = require("../utils");

const protect = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token || token == "null") {
    res.clearCookie("token");
    throw new AuthError({
      message: "Unauthorized access",
      error: "Unauthorized",
      statusCode: 401,
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.auth = decoded;
  if (!req.auth) {
    res.clearCookie("token");
    throw new AuthError({
      message: "Unauthorized access",
      error: "Unauthorized",
      statusCode: 401,
    });
  }
  next();
});

const authorize = (...roles) =>
  asyncWrapper(async (req, res, next) => {
    if (!roles.join(" ").includes(req.auth.role)) {
      res.clearCookie("token");
      throw new AuthError({
        message: "You don't have access to this resource",
        error: "Forbidden",
        statusCode: 403,
      });
    }
    next();
  });

module.exports = { protect, authorize };
