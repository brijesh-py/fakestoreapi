const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { limiter } = require("./utils/requestLimit");
const { protect } = require("./middlewares/protectMiddleware");

// routes
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.send("Fake Store API!");
});

app.use("/api/admin", limiter({ w: 60, l: 100 }), adminRoute);
app.use("/api/products", limiter({ w: 60, l: 100 }), productRoute);
app.use("/api/auth", limiter({ w: 60, l: 50 }), userRoute);
app.use("/api/carts", limiter({ w: 60, l: 50 }), protect, cartRoute);

module.exports = app;
