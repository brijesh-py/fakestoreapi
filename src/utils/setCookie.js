const jwt = require("jsonwebtoken");

const setCookie = async (res, user) => {
  const token = await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // httpOnly: true,
    // samesite: "none",
    // secure: true,
  };
  res.cookie("token", token, options);
  return token;
};

module.exports = setCookie;
