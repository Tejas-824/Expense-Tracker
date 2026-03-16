const Category = require("../model/Category");

const createCategoryCtrl = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type are required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      type,
      user: req.userAuthId,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      type,
      user: req.userAuthId,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create category",
    });
  }
};

module.exports = createCategoryCtrl;