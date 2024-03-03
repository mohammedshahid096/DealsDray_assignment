const express = require("express");
const IndexRoutes = express.Router();
const UserRoutes = require("./user.routes");
const EmployeeRoute = require("./employee.routes");

// # User routes
IndexRoutes.use("/user", UserRoutes);
IndexRoutes.use("/employee", EmployeeRoute);

module.exports = IndexRoutes;
