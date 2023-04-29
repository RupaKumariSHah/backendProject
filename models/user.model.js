const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "this email is already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("this email is not valid");
      }
    },
  },

  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
});
const customer = new mongoose.model("tblcustomer_profile", customerSchema);
module.exports = customer;
