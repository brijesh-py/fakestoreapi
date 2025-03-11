class DBError extends Error {
  constructor({
    message = "something went wrong",
    error = "Bad request",
    statusCode = 400,
  }) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}

module.exports = DBError;
