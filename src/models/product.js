const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // ------------------------------------
  sku: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  materials: {
    type: String,
    required: true,
  },
  other_info: {
    type: String,
    required: true,
  },
  // -------------------------------------
  about_item_1: {
    type: String,
    required: true,
  },
  about_item_2: {
    type: String,
    required: true,
  },
  about_item_3: {
    type: String,
    required: true,
  },
  about_item_4: {
    type: String,
    required: true,
  },
  about_item_5: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  // -------------------------------------
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Product = new mongoose.model("products", productSchema);
module.exports = Product;
