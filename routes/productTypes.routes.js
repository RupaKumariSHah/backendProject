const express = require("express");

const producttypeController = require("./../controllers/products.types.controller");
const authenciate = require("../middleware/authenciate");
const authenticate = require("../middleware/authenciate");
const router = express.Router();

router.post(
  "/addProductType",
  authenticate.producttypeController.addProductType
);

router.get("/get", authenciate, producttypeController.getAllProductType);

module.exports = router;
///
