import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = verified;
    next();
  });
};

export default authenticateToken;
