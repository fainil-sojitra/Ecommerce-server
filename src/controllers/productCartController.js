const { response } = require("express");
const ProductCart = require("../models/productCart");

// add product cart
exports.postProductCart = async (req, res) => {
  try {
    let product_cart = new ProductCart({
      ...req.body,
      user: req.user._id,
    });

    // console.log('product_id: req.user._id---->', req.product_id._id)
    console.log("product_cart data--->", product_cart);

    const result = await product_cart.save();
    result.toString();

    res.send(result);
  } catch (error) {
    if (!error) {
      return error;
    } else {
      res.status(401).json({
        message: "please fill all data",
        status: "false",
        error: error.message,
      });
      console.log("error--->>", error);
    }
  }
};

// get all cart product
exports.getAllCartProduct = async (req, res) => {
  try {
    let product_cart = await ProductCart.find(req.body);
    res.send(product_cart);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// count cart product
exports.countCartProduct = async (req, res) => {
  try {
    const userId = req.params.userId;

    let cartData = await ProductCart.countDocuments({
      user: { $in: [userId] },
    });
    // console.log("=============", userId);
    // console.log("cartData--->", cartData);
    res.send({cartData, userId});
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};
