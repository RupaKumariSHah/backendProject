const jwt = require("jsonwebtoken");
require("dotenv");
const userModel = require("../models/user_model");
//middleware use any where used un the project
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //req.createdBy = decode.id;
    const userid = decode.id;
    req.createdby = userid;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(403).json({
        message: "Token Expired...",
      });
    } else {
      res.status(401).json({
        message: `Authenticate Failed...${error}`,
      });
    }
  }
};

module.exports = authenticate;
