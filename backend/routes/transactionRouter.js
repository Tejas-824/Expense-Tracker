const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const transactionController = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();

// Add Transaction
transactionRouter.post("/create", isAuthenticated, transactionController.create);

// Get Transactions
transactionRouter.get("/lists", isAuthenticated, transactionController.getFilteredTransactions);

// Update Transaction
transactionRouter.put("/update/:id", isAuthenticated, transactionController.update);

// Delete Transaction
transactionRouter.delete("/delete/:id", isAuthenticated, transactionController.delete);

module.exports = transactionRouter;
