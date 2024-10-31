const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address_type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Address = new mongoose.model("addresses", addressSchema);
module.exports = Address;
