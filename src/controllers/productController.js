const { ObjectId } = require("mongodb");
const Product = require("../models/product");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(require("fs").unlink);

// add product
exports.postProduct = async (req, res) => {
  try {
    let product = new Product({
      ...req.body,
      image: req.file.path,
      user: req.user._id,
    });

    const result = await product.save();
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
    }
  }
};

// update product
exports.putProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params._id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    // console.log("------>", req.user._id);  
    if (req.user._id !== product.user.toString()) {
      return res.status(401).json({
        message: "User not authorized",
        success: false,
      });
    }
    const oldImagePath = product.image;
    product.set(req.body);
    if (req.file) {
      product.image = req.file.path;
    }
    await product.save();
    if (oldImagePath) {
      await unlinkAsync(oldImagePath);
    }
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product: product,
    });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      success: false,
      error: error.message,
    });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params._id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    if (req.user._id !== product.user.toString()) {
      return res.status(401).json({
        message: "User not authorized",
        success: false,
      });
    }
    const oldImagePath = product.image;
    await Product.deleteOne({ _id: req.params._id });
    if (oldImagePath) {
      await unlinkAsync(oldImagePath);
    }
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({
      message: "Error deleting product",
      success: false,
      error: error.message,
    });
  }
};

// get all data
exports.getProduct = async (req, res) => {
  try {
    const productID = req.params.productId;
    const productDetails = await Product.findById(productID);
    const products = await Product.aggregate([
      {
        $match: { _id: new ObjectId(productDetails) },
      },
      {
        $lookup: {
          from: "registers",
          localField: "user",
          foreignField: "_id",
          as: "registration",
        },
      },
    ]);

    const port = 5000;
    const hostname = req.hostname;
    const url = req.protocol + "://" + hostname + ":" + port + "/";

    for (const product of products) {
      if (product.image) {
        product.image = url + product.image;
      }
      if (product.registration.length > 0 && product.registration[0].image) {
        product.registration[0].image = url + product.registration[0].image;
      }
    }

    res.send(products);
  } catch (error) {
    if (!error) {
      return error;
    }
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// get all product
exports.getAllProduct = async (req, res) => {
  try {
    let product = await Product.find(req.body);
    res.send(product);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// get product details
exports.getProductDetails = async (req, res) => {
  try {
    const productID = req.params.userId;
    const product = await Product.findById(productID);
    res.send(product);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// high tolow price
exports.highToLow = async (req, res) => {
  try {
    let product = await Product.find(req.body).sort({ price: -1 });
    res.send(product);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// low to high price
exports.lowTohigh = async (req, res) => {
  try {
    let product = await Product.find(req.body).sort({ price: 1 });
    res.send(product);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};
