const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_type: {
      type: String,
      ref: "ALLproducts_tbl",
    },
    productName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    // img: {
    //   type: String,
    //   // required: true,
    // },
    categories: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    inStock: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  }
  // { timestamps }
);
const Products = new mongoose.model("detail_products_tbl", productSchema);
//export the variable
module.exports = Products;
