const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  // extract the jwt token from request header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "UnAuthorized" });

  try {
    //verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate jwt token
const generateToken = (userData) => {
  //generate anew JWT token using user Data
  return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
