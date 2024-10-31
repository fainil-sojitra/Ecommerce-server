const Category = require("../models/category");

// add category
exports.postCategory = async (req, res) => {
  try {
    let category = new Category({
      ...req.body,
    });

    const result = await category.save();
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

// get categorys
exports.getCategory = async (req, res) => {
  try {
    let category = await Category.find(req.body);
    res.send(category);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// get category details
exports.getCategoryDetails = async (req, res) => {
  try {
    const categoryID = req.params._id;
    const category = await Category.findById(categoryID);

    res.send(category);
  } catch (error) {
    res.status(401).json({
      message: "data not found",
      status: "false",
      error: error.message,
    });
  }
};

// put category details
exports.putCategoryDetails = async (req, res) => {
  try {
    const categoryID = req.params._id;
    const category = await Category.findById(categoryID);

    if (!category) {
      return res.status(404).json({
        message: "Category Details not found",
        success: false,
      });
    }
    if (req.file) {
      category.set({ ...req.body });
      await category.save();
    } else {
      category.set(req.body);
      await category.save();
    }
    res.status(200).json({
      message: "Category Details data updated successfully",
      success: true,
      category: category,
    });
  } catch (error) {
    console.log("Error updating Category Details data:", error);
    res.status(500).json({
      message: "Error updating Category Details data",
      success: false,
      error: error.message,
    });
  }
};

// delete category
exports.deleteCategory = async (req, res) => {
  try {
    const CategoryId = req.params._id;
    const category = await Category.findById(CategoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting Category:", error);
    res.status(500).json({
      message: "Error deleting Category",
      success: false,
      error: error.message,
    });
  }
};
