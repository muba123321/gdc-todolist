import jwt from "jsonwebtoken";

// function to authenticate User bofore accessing any api
const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export default authenticate;
