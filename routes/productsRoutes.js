const express = require("express");
const productdetailController = require("./../controllers/products.controller");
const router = express.Router();
const upload = require("../Middleware/upload");

//without file upload
//router.post("/addProducts", productdetailController.ProductDetailadd);
//
//=====single file upload======
router.post(
  "/addProducts",
  upload.single("avatar"),
  productdetailController.ProductDetailadd
);
//======multiple file upload=====
//router.post("/addProducts",upload.array("avatar[]",productdetailCOntroller.));
// router.post(
//   "/addProducts",
//   upload.array("avatar[]"),
//   productdetailController.ProductDetailadd
// );

router.get("/getProducts", productdetailController.getAllProducts);

router.delete("/deleteProducts/:id", productdetailController.deleteProduct);

router.patch("/editproduct/:id", productdetailController.EditProduct);
// router.get("/getproducts", productController.);

module.exports = router;
