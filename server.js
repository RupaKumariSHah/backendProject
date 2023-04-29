const express = require("express");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//const userRouter = require("./routes/addUserRoutes");
const userRouter = require("./routes/user.routes");
//import the routes folder in server.js

const productsRouter = require("./routes/productsRoutes");

// const typeRouter = require("./routes/bikeType.routes");
// const bikeRouter = require("./routes/bike.routes");

const PORT = process.env.PORT || 8005;

const app = express();
app.use(cors()); //must implement the cors connected backend and frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

try {
  mongoose.set("strictQuery", true);
  const dburl = process.env.DB_MONGO;

  mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database is connected...");

  app.use("/user", userRouter);
  //here /products is a static path NAME OF URL
  app.use("/products", productsRouter);

  app.listen(PORT, () => {
    console.log(`Server is running... on Port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
