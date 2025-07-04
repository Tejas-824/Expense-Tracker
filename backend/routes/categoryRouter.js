const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const categoryRouter = express.Router();

//! Add
categoryRouter.post("/create", isAuthenticated, categoryController.create);

//! Lists
categoryRouter.get("/lists", isAuthenticated, categoryController.lists);

//! Update
categoryRouter.put("/update/:categoryId", isAuthenticated, categoryController.update);

//! Delete
categoryRouter.delete("/delete/:id", isAuthenticated, categoryController.delete);

module.exports = categoryRouter;
