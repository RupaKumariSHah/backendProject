const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  productcategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdby:{
    type:String,
    required:true,
  }
});
// const typeProducts = new mongoose.model(producttype_tbl, productTypeSchema);
module.exports = mongoose.model("product_type", productTypeSchema);
