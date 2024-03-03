const express = require("express");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const {
  AddEmployeeController,
  AllEmployeeController,
  SingleEmployeeController,
  UpdateEmployeeController,
  UpdateEmployeeProfileController,
  DeleteEmployeeController,
  DashboardCotroller,
} = require("../Controllers/employee.controller");
const { EmployeeProfileUpload } = require("../Middlewares/Multer");
const EmployeeRoute = express.Router();

EmployeeRoute.route("/add").post(
  Authentication,
  Authorization("admin"),
  EmployeeProfileUpload,
  AddEmployeeController
);

EmployeeRoute.route("/all").get(
  Authentication,
  Authorization("admin"),
  AllEmployeeController
);

EmployeeRoute.route("/:id")
  .get(Authentication, Authorization("admin"), SingleEmployeeController)
  .put(Authentication, Authorization("admin"), UpdateEmployeeController)
  .delete(Authentication, Authorization("admin"), DeleteEmployeeController);

EmployeeRoute.route("/profile/:id").put(
  Authentication,
  Authorization("admin"),
  EmployeeProfileUpload,
  UpdateEmployeeProfileController
);

EmployeeRoute.route("/dashboard/graph").get(
  Authentication,
  Authorization("admin"),
  DashboardCotroller
);

module.exports = EmployeeRoute;
