const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  // create
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      res.status(400);
      throw new Error("Name and type are required for creating a category");
    }

    const normalizedName = name.trim().toLowerCase();
    const normalizedType = type.trim().toLowerCase();

    const validTypes = ["income", "expense"];
    if (!validTypes.includes(normalizedType)) {
      res.status(400);
      throw new Error(`Invalid category type: ${type}`);
    }

    const categoryExists = await Category.findOne({
      name: normalizedName,
      type: normalizedType,
      user: req.user,
    });

    if (categoryExists) {
      res.status(400);
      throw new Error(
        `Category "${categoryExists.name}" already exists in the database`
      );
    }

    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type: normalizedType,
    });

    res.status(201).json(category);
  }),

  // lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json(categories);
  }),

  // update
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { type, name } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    if (category.user.toString() !== req.user.toString()) {
      res.status(403);
      throw new Error("User not authorized");
    }

    const oldName = category.name;

    const normalizedName = name ? name.trim().toLowerCase() : category.name;
    const normalizedType = type ? type.trim().toLowerCase() : category.type;

    const validTypes = ["income", "expense"];
    if (!validTypes.includes(normalizedType)) {
      res.status(400);
      throw new Error(`Invalid category type: ${type}`);
    }

    const duplicateCategory = await Category.findOne({
      _id: { $ne: categoryId },
      name: normalizedName,
      type: normalizedType,
      user: req.user,
    });

    if (duplicateCategory) {
      res.status(400);
      throw new Error("Category with same name and type already exists");
    }

    category.name = normalizedName;
    category.type = normalizedType;

    const updatedCategory = await category.save();

    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: updatedCategory.name },
        }
      );
    }

    res.status(200).json(updatedCategory);
  }),

  // delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    if (category.user.toString() !== req.user.toString()) {
      res.status(403);
      throw new Error("User not authorized");
    }

    const defaultCategory = "Uncategorized";

    await Transaction.updateMany(
      { user: req.user, category: category.name },
      { $set: { category: defaultCategory } }
    );

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category removed and transactions updated",
    });
  }),
};

module.exports = categoryController;