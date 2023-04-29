const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/pdf"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg & png file Supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = upload;

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: function (req, file, cb) {
//     console.log("File Object", file, cb);
//     let ext = "";
//     if (file.originalname.split(".").length > 1) {
//       ext = file.originalname.substring(file.originalname.lastIndexOf("."));
//     }
//     console.log("ext", ext);
//     cb(null, file.fieldname + "-" + Date.now() + ext);

//   },
// });

// const limits = {
//   fileSize: 5242880, //5 MB
// };

// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
//     req.fileValidationError = "Only image files are allowed!";
//     return cb(false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   limits,
//   storage,
//   fileFilter,
// });

// module.exports = { upload };
