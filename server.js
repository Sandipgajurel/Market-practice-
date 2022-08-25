const router = require("express").Router();
const { body } = require("express-validator");
const express = require("express");
var app = express();
//user
const { register } = require("./controllers/userController/userRegister");
const { login } = require("./controllers/userController/userLogin");
//import database connection
const db_connection = require("./dbConnection");
// image upload
const http = require("http");
const fs = require("fs");
const url = require("url");

const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { products } = require("./controllers/productController/addProduct");
app.use(bodyParser.json());
app.use(cors());

//! Use of Multer
// this images folder should be inside of frontend program files
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "../images/"); // './public/images/' directory name where save the file
  },
  // filename: (req, file, callBack) => {
  //     callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  // }
});

//use multer libery for image uploads
var upload = multer({
  storage: storage,
}).single("image");

//user registration
router.post(
  "/register",
  [
    body("name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  register
);

// serving static files
router.use("../images/", express.static(__dirname + "../images/"));

//login
router.post(
  "/login",
  [
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);

//create or add new product
router.post(
  "/product/create",
  upload,
  [body("productName", "enter product name").notEmpty()],
  products
);

//get all product
router.get("/getproduct", (req, res) => {
  var query = "select * from product";
  db_connection.query(query, (err, results) => {
    if (!err) {
      return res.send(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
