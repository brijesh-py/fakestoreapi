const { rateLimit } = require("express-rate-limit");

const limiter = ({ w = 60, l = 100 }) =>
  rateLimit({
    windowMs: w * 60 * 1000,
    limit: l,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message:"Too many requests, please try again later or contact support", 
  });

module.exports = { limiter };
