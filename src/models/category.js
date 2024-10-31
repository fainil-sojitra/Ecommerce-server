const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
});

const Category = new mongoose.model("categorys", categorySchema);
module.exports = Category;
