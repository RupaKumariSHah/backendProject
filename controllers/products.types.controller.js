// c
const productTypeModel = require("../models/productsTypesSchema.model");
//add products
const addProductType = async (req, res) => {
  try {
    const newProduct_type = await new productTypeModel({
      productcategory: req.body. productcategory,
      description: req.body.description,
      createdby: req.createdby,
    });

    const data = await newProduct_type.save();
    res.json({
      message: "Producttype  Registered Succesfully...",
    });
  } catch (error) {
    res.json({
      message: `Error while product type Registered ${error}`,
    });
  }
};

//get all products type

const getAllProductType = async (req, res) => {
  try {
    const productsTypes = await productTypeModel.find();
    res.json({
      productsTypes,
    });
  } catch (error) {
    res.json({
      message: `All products type... ${error}`,
    });
  }
};
//22
module.exports = {
  addProductType,
  getAllProductType,
};
