const jwt = require("jsonwebtoken");
const { ZodError } = require("zod");
const DBError = require("./DBError");
const AuthError = require("./AuthError");
const { ERRORS } = require("../constants/messages");
const httpStatusCode = require("../constants/httpStatusCode");

const zodErrors = (issues) => issues.map((issue) => issue.message);

const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    let statusCode = httpStatusCode.SERVER_ERROR;
    const response = { success: false, error: ERRORS.SERVER_ERROR };
    if(error instanceof jwt.JsonWebTokenError) {
      statusCode = httpStatusCode.UNAUTHORIZED;
      response.message = error.message;
      response.error = ERRORS.UNAUTHORIZED;
    }
    if (error instanceof DBError || error instanceof AuthError) {
      res.clearCookie("token");
      statusCode = error.statusCode;
      response.message = error.message;
      response.error = error.error;
    } else if (error instanceof ZodError) {
      statusCode = error.status || httpStatusCode.BAD_REQUEST;
      response.message = zodErrors(error.issues);
      response.error = ERRORS.BAD_REQUEST;
    } else if (process.env.NODE_ENV === "development") {
      response.message = error.message;
      console.error(error);
    } else {
      response.message = "Something went wrong";
    }
    return res.status(statusCode).json(response);
  }
};

module.exports = asyncWrapper;
