const Register = require("../models/register");
const ProductCart = require("../models/productCart");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const mongoose = require("mongoose");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// register a new user
exports.postUsers = async (req, res) => {
  try {
    let register = new Register({ ...req.body, image: req.file.path });
    console.log("rewgfsiter -->", register);
    // let token = await register.generateToken();
    let result = await register.save();
    result.toString();
    res.send(result);
  } catch (error) {
    // if (error) {
    //   return error;
    // } else {
    res.status(401).json({
      message: "please fill all data",
      status: "false",
      error: error.message,
    });
    // }
  }
};

// login user
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const register = await Register.findOne({ email });
    if (register) {
      const isMatch = await bcrypt.compare(password, register.password);
      if (isMatch) {
        const token = await register.generateToken();
        res.send({ token, register });

        res.send("wrong password");
      }
    } else {
      res.status(401).json({
        message: "email not registered",
        status: "false",
      });
    }
  } catch (error) {
    if (error) {
      return error;
    } else {
      res.status(401).json({
        message: "login failed",
        status: "false",
      });
    }
  }
};

// update user
exports.putUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await Register.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (req.file) {
      const oldImagePath = user.image;
      user.set({ ...req.body, image: req.file.path });
      await user.save();
      if (oldImagePath) {
        await unlinkAsync(oldImagePath);
      }
    } else {
      user.set(req.body);
      await user.save();
    }
    res.status(200).json({
      message: "User data updated successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error updating user data:", error);
    res.status(500).json({
      message: "Error updating user data",
      success: false,
      error: error.message,
    });
  }
};

// delete user
exports.deleteUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await Register.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const oldImagePath = user.image;
    await user.deleteOne();

    if (oldImagePath) {
      await unlinkAsync(oldImagePath);
    }

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
      success: false,
      error: error.message,
    });
  }
};

// get user data

exports.getAllUsers = async function (req, res) {
  try {
    // const userId = req.params.userId;
    const users = await Register.find(req.body);
    res.send(users);
  } catch (error) {
    res.status(401).json({
      message: "No available data",
      status: "false",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('userId--->>',userId)
    //     const users = await Register.findById(userId);
    const users = await Register.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "user",
          as: "addresses",
        },
      },
      {
        $unwind: {
          path: "$addresses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "productcarts",
          localField: "_id",
          foreignField: "user",
          as: "cart",
        },
      },
    ]);

    console.log('users--->><>',users)
    const port = 5000;
    const hostname = req.hostname;
    const url = req.protocol + "://" + hostname + ":" + port + "/";

    for (const user of users) {
      if (user.image) {
        user.image = url + user.image;
      }
      // if (product.registration.length > 0 && product.registration[0].image) {
      //   product.registration[0].image = url + product.registration[0].image;
      // }
    }

    res.send(users);
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

exports.showUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    //     const users = await Register.findById(userId);
    const users = await Register.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "user",
          as: "addresses",
        },
      },
      {
        $lookup: {
          from: "productcarts",
          localField: "_id",
          foreignField: "user",
          as: "cart",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "user",
          as: "product",
        },
      },
    ]);

    const port = 5000;
    const hostname = req.hostname;
    const url = req.protocol + "://" + hostname + ":" + port + "/";

    for (const user of users) {
      if (user.image) {
        user.image = url + user.image;
      }
      // if (product.registration.length > 0 && product.registration[0].image) {
      //   product.registration[0].image = url + product.registration[0].image;
      // }
    }

    res.send(users);
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
