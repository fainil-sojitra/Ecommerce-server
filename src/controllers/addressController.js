const Address = require("../models/address");

// add address
exports.postShippingAddress = async (req, res) => {
  try {
    let address = new Address({
      ...req.body,
      user: req.user._id,
    });

    console.log("address data--->", address);

    const result = await address.save();
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

// update address
exports.putShippingAddress = async function (req, res) {
  try {
    const addressId = req.params.userId;
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }
    if (req.file) {
      address.set({ ...req.body });
      await address.save();
    } else {
      address.set(req.body);
      await address.save();
    }
    res.status(200).json({
      message: "Address data updated successfully",
      success: true,
      address: address,
    });
  } catch (error) {
    console.log("Error updating address data:", error);
    res.status(500).json({
      message: "Error updating address data",
      success: false,
      error: error.message,
    });
  }
};

// delete address
exports.deleteShippingAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const address = await Address.findById(userId);

    if (!address) {
      return res.status(404).json({
        message: "address not found",
        success: false,
      });
    }

    await address.deleteOne();

    res.status(200).json({
      message: "address deleted successfully",
      success: true,
    });
  } catch (error) {
    if (!error) {
      return error;
    } else {
      res.status(500).json({
        message: "Error deleting address",
        success: false,
        error: error.message,
      });
    }
  }
};
