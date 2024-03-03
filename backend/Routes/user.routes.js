const express = require("express");
const {
  LoginUserController,
  LogoutUserController,
  GetDetails,
} = require("../Controllers/user.controller");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const UserRoutes = express.Router();

// ### Login related routes
UserRoutes.route("/login").post(LoginUserController);
UserRoutes.route("/logout").get(
  Authentication,
  Authorization("employee", "admin"),
  LogoutUserController
);

UserRoutes.route("/me").get(
  Authentication,
  Authorization("employee", "admin"),
  GetDetails
);

module.exports = UserRoutes;
