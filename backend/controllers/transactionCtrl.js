const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const transactionController = {
  // add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!type || !amount || !date || !category) {
      res.status(400);
      throw new Error("Type, category, amount and date are required");
    }

    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),

  // lists
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filters.date = { ...filters.date, $gte: start };
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filters.date = { ...filters.date, $lte: end };
    }

    if (type) {
      filters.type = type;
    }

    if (category) {
      if (category === "All") {
        // no filter
      } else if (category === "Uncategorized") {
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }

    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  // update
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    if (transaction.user.toString() !== req.user.toString()) {
      res.status(403);
      throw new Error("You are not authorized to update this transaction");
    }

    transaction.type = req.body.type || transaction.type;
    transaction.category = req.body.category || transaction.category;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.date = req.body.date || transaction.date;
    transaction.description = req.body.description || transaction.description;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  }),

  // delete
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    if (transaction.user.toString() !== req.user.toString()) {
      res.status(403);
      throw new Error("You are not authorized to delete this transaction");
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction removed" });
  }),
};

module.exports = transactionController;