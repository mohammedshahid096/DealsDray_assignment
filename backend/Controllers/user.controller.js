const httpErrors = require("http-errors");
const { LoginUserValidation } = require("../JoiSchemas/user.schema");
const userModel = require("../Models/user.model");
const { errorConstant, successConstant } = require("../Utils/constants");
const { VerifyPasswordMethod } = require("../Middlewares/usermodel.methods");
const SendToken = require("../Middlewares/SendToken");

// login user
module.exports.LoginUserController = async (req, res, next) => {
  try {
    const { error } = LoginUserValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email }).select("+password");
    if (!userExist) {
      return next(httpErrors.NotFound(errorConstant.EMAIL_NOT_FOUND));
    }

    const isPasswordCorrect = await VerifyPasswordMethod(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) {
      return next(httpErrors.NotFound(errorConstant.EMAIL_NOT_FOUND));
    }

    delete userExist.password;

    SendToken(userExist, 200, res);
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// logout user
module.exports.LogoutUserController = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.LOGOUT,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.GetDetails = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.userid);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
