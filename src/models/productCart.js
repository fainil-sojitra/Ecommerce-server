const mongoose = require("mongoose");

const productCartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product_id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  stock: {
    type: String,
  },
  weight: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  sku: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ProductCart = new mongoose.model("productCarts", productCartSchema);
module.exports = ProductCart;
