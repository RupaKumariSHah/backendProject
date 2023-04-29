const productdetailModel = require("../models/productSchema.model");
const jwt = require("jsonwebtoken");
require("dotenv");
const ProductDetailadd = async (req, res) => {
  try {
    //console.log("request", req.body);
    const newproducts = new productdetailModel({
      productType: req.body.productType,
      productName: req.body.productName,
      desc: req.body.desc,
      img: req.body.img,
      categories: req.body.categories,
      quantity: req.body.quantity,
      price: req.body.price,
      inStock: req.body.inStock,
      discount: req.body.discount,
    });
    if (req.file) newproducts.avatar = req.file.path; //for single file upload

    // if (req.files) {
    //   let path = "";
    //   req.files.forEach(function (files, index, arr) {
    //     path = path + files.path + ","; // save the file locartions with , seperated
    //   });
    //   path = path.substring(0, path.lastIndexOf(",")); // ren=move the last comma
    //   newproducts.avatar = path;
    // }
    await newproducts.save();
    res.json({
      message: "Products added Succesfully...",
    });
  } catch (error) {
    res.json({
      // message: `Error while User Registered ${error}`,
      message: `products is unSuccessful `,
      error: error,
    });
  }
};
//get all Products
const getAllProducts = async (req, res) => {
  try {
    const product = await productdetailModel.find();
    res.json({
      product, //bikes
    });
  } catch (error) {
    res.json({
      message: `All products type... ${error}`,
    });
  }
};
//delete the products

const deleteProduct = async (req, res) => {
  try {
    const bike = await productdetailModel.findByIdAndDelete(req.params.id);

    if (bike) {
      res.status(200).json({
        status: 200,
        // data: null
        message: "Deleted successfully!",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "product not found!",
      });
    }
  } catch (err) {
    res.json({
      status: "fail",
      message: "error",
    });
  }
};
//edit products

const EditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedProduct = {
      product_type: req.body.product_type,
      productName: req.body.productName,
      price: req.body.price,
      createdBy: req.body.createdBy,
    };
    const data = await bikedetailModel.updateOne(
      { _id: id },
      { $set: updatedProduct }
    );
    res.json({
      message: "Updated successfully...",
    });
  } catch (error) {
    res.json({
      message: `editing bike... ${error}`,
    });
  }
};

module.exports = {
  ProductDetailadd,
  getAllProducts,
  deleteProduct,
  EditProduct,
};
