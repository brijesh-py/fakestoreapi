class AuthError extends Error {
  constructor({
    message = "Unauthorized access",
    error = "Unauthorized",
    statusCode = 401,
  }) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}

module.exports = AuthError;
