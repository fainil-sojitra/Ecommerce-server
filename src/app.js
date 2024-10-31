// require("./db/conn");
// const express = require("express");
// const router = require("./routes/routes");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const multer = require("multer");
// const Register = require("./models/register");
// const Product = require("./models/product");
// const auth = require("./middleware/auth");

// const app = express();
// app.use(express.json());

// app.use(router);

// app.use(express.static(path.join(__dirname, "public")));
// app.use("/user-images", express.static("user-images"));
// app.use("/product-images", express.static("product-images"));

// // user register

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./user-images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// var upload = multer({ storage: storage });
// app.post("/register/", upload.single("image"), async (req, res) => {
//   try {
//     const port = 5000;
//     const hostname = req.hostname;
//     const url = req.protocol + "://" + hostname + ":" + port + req.path;
//     // console.log("url----------------=>", url);
//     let register = new Register({ ...req.body, image: req.file.path });
//     // console.log("req.file ----> ", req.file);
//     // console.log("register", register);

//     let token = await register.generateToken();
//     // console.log("token ---->", token);

//     let result = await register.save();
//     result.toString();
//     res.send(result);
//   } catch (error) {
//     console.log("error register---->>", error);
//     res.send("error register ---->>", error);
//   }
// });

// update user

// app.put("/user/:userId", async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       const updates = req.body;
//       const user = await Register.findByIdAndUpdate(userId, updates, { new: true });
//       if (!user) {
//         return res.status(404).send("User not found");
//       }
//       res.send(user);
//     } catch (error) {
//       console.log("Error updating user data:", error);
//       res.status(500).send("Error updating user data");
//     }
//   });

// user login

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const register = await Register.findOne({ email });
//     console.log("register ---->", register);
//     if (register) {
//       const isMatch = await bcrypt.compare(password, register.password);
//       console.log("isMatch ---->", isMatch);
//       if (isMatch) {
//         const token = await register.generateToken();
//         console.log("token ---->", token);
//         res.send({ token, register });
//       } else {
//         res.send("wrong password");
//       }
//     } else {
//       res.send("wrong email");
//     }
//   } catch (error) {
//     res.send("error login ---->>", error);
//     console.log("error login ---->>", error);
//   }
// });

// add prodeuct
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./product-images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// var upload = multer({ storage: storage });
// app.post("/add-product", auth, upload.single("image"), async (req, res) => {
//   try {
//     const port = 5000;
//     const hostname = req.hostname;
//     const url = req.protocol + "://" + hostname + ":" + port + req.path;
//     const userId = req.user._id;
//     console.log("user-Id=--->", userId);
//     // const userId = UserTokenId;
//     let product = new Product({
//       ...req.body,
//       image: req.file.path,
//       user: req.user._id,
//     });
//     // console.log("req.file ----> ", req.file.path);
//     console.log("product", product);
//     const result = await product.save();
//     result.toString();
//     res.send(result);
//   } catch (error) {
//     console.log("error add-product---->>", error);
//     res.send("error add-product ---->>", error);
//   }
// });

// update product

// app.put("/update-product/:_id", auth, async (req, res) => {
// try {
//   const products = await Product.findOne({
//     _id: req.params._id,
//   });
//   console.log("find_products--->", products);

//   if (req.user._id === products.user.toString()) {
//     let product = await Product.updateOne({ _id: req.params._id }, req.body, {
//       new: true,
//     });
//     console.log("update_product--->", product);
//     res.send(product);
//   } else {
//     res.send("(error) --> user not authorized");
//     console.log("(error) --> user not authorized");
//   }
// } catch (error) {
//   console.log("(error) --> update-product---->>", error);
//   res.send("(error) --> update-product ---->>", error);
// }
// });

// delete product

// app.delete("/delete-product/:_id", auth, async (req, res) => {
//   try {
//     const products = await Product.findOne({
//       _id: req.params._id,
//     });
//     console.log("find_products--->", products);

//     if (req.user._id === products.user) {
//       let product = await Product.deleteOne({ _id: req.params._id });
//       console.log("delete_product--->", product);
//       res.send(product);
//     } else {
//       console.log("(error) --> user not authorized");
//       res.send("(error) --> user not authorized");
//     }
//     // res.send(products);
//     // res.send(req.params._id);
//   } catch (error) {
//     console.log("(error) --> delete-product---->>");
//     res.send("(error) --> delete-product ---->>");
//   }
// });

// app.get("/product", async (req, res) => {
// try {
//   const products = await Product.aggregate([
//     {
//       $lookup: {
//         from: "registers",
//         localField: "user",
//         foreignField: "_id",
//         as: "registration",
//       },
//     },
//   ]);

//   const port = 5000;
//   const hostname = req.hostname;
//   const url = req.protocol + "://" + hostname + ":" + port + "/";
//   // console.log(url);

//   // for (const product of products) {
//   //   if (product.image) {
//   //     product.image = url + product.image;
//   //   }
//   // }

//   for (const product of products) {
//     if (product.image) {
//       product.image = url + product.image;
//     }
//     if (product.registration.length > 0 && product.registration[0].image) {
//       product.registration[0].image = url + product.registration[0].image;
//     }
//   }

//   console.log("get-all-product_____/", products);

//   // let images = await Register.findOne(req.body.image);
//   // console.log("product-images------->", url + images.image);
//   res.send(products);
// } catch (err) {
//   console.log("error", err);
//   res.status(400).send("error", err);
// }
// });

require("./db/conn");
const express = require("express");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(router);

app.listen(5000);
