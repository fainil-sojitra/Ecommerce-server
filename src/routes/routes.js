const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

const RegisterController = require("../controllers/registerController");
const ProductController = require("../controllers/productController");
const AddressController = require("../controllers/addressController");
const productCartController = require("../controllers/productCartController");
const categoryController = require("../controllers/categoryController");

router.use(express.json());

router.use(express.static(path.join(__dirname, "public")));
router.use("/user-images", express.static("user-images"));
router.use("/product-images", express.static("product-images"));

// socket io
// const http = require("http");
// const server = http.createServer(router);
// router.use(express.static("/public"));
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000/",
//     methods: ["GET", "PUT"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
//   io.on("disconnect", () => {
//     console.log("User Disconnected...", socket.id);
//   });
// });



// upload images (multer)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./product-images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

// registration routes
router.post("/register", upload.single("image"), RegisterController.postUsers);
router.post("/login", RegisterController.postLogin);
router.put(
  "/update-user/:userId",
  auth,
  upload.single("image"),
  RegisterController.putUser
);
router.delete("/delete-user/:userId", auth, RegisterController.deleteUser);
router.get("/get-user/:userId", RegisterController.getUsers);
router.get("/show-user/:userId", RegisterController.showUsers);
router.get("/get-all-user/", RegisterController.getAllUsers);

// prodect routes
router.post(
  "/add-product",
  auth,
  upload.single("image"),
  ProductController.postProduct
);
router.put(
  "/update-product/:_id",
  auth,
  upload.single("image"),
  ProductController.putProduct
);
router.delete("/delete-product/:_id", auth, ProductController.deleteProduct);
router.get("/product/:productId", ProductController.getProduct);
router.get("/all-product", ProductController.getAllProduct);
router.get("/high_to_low", ProductController.highToLow);
router.get("/low_to_high", ProductController.lowTohigh);
router.get("/product_details/:userId", ProductController.getProductDetails);

// shipping address
router.post(
  "/add-shipping-address",
  auth,
  AddressController.postShippingAddress
);
router.put(
  "/update-shipping-address/:userId",
  auth,
  AddressController.putShippingAddress
);
router.delete(
  "/delete-shipping-address/:userId",
  auth,
  AddressController.deleteShippingAddress
);

// product cart getAllCartProduct
router.post("/add-cart", auth, productCartController.postProductCart);
router.get("/get_cart_product", productCartController.getAllCartProduct);
router.get(
  "/count_cart_product/:userId",
  productCartController.countCartProduct
);

// product CATEGORY

router.post("/add-category", auth, categoryController.postCategory);
router.get("/get-category", categoryController.getCategory);
router.get("/get-category-details/:_id", categoryController.getCategoryDetails);
router.put(
  "/put-category-details/:_id",
  auth,
  categoryController.putCategoryDetails
);
router.delete("/delete-category/:_id", auth, categoryController.deleteCategory);

module.exports = router;
