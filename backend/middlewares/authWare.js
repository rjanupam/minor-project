const jwt = require("jsonwebtoken");

const autheticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
      if (err) return;
      req.user = verified;
      next();
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = autheticateToken;
