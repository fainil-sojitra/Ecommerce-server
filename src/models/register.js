const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"],
  },
  email: {
    // type: String,
    // required: true,
    // match: [/.+\@.+\..+/, "Please fill a valid email address"],
    // unique: [true, "email already in present"],
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "email already in present"],
    required: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// user token

employeeSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "refistrationsusertokensecretkeyss",
      {
        expiresIn: 5000000,
      }
    );
    this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    return token;
  } catch (error) {
    // return error;
    res.status(401).json({
      message: "please fill all data",
      status: "false",
    });
  }
};

// user bcrypt(secure) password

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Register = new mongoose.model("registers", employeeSchema);
module.exports = Register;
