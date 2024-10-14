import jwt from "jsonwebtoken";

// function to authenticate User bofore accessing any api
const authenticate = (req, res, next) => {
  console.log(req.cookies);
  console.log(req.cookies.access_token);
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) return res.status(401).send({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    req.user = decoded;
    console.log(req.user);

    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};

export default authenticate;
