const response = (res, { statusCode = 200, message, ...data }) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

module.exports = response;