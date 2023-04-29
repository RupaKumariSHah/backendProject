const express = require("express");
const userController = require("../controllers/user.controllers");
const router = express.Router();

router.post("/add", userController.addUser);
router.post("/login", userController.login);
// router.post("/products",)
//http://localhost:8003/user/login
module.exports = router;
