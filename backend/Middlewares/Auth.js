const httpErrors = require("http-errors");
const { errorConstant } = require("../Utils/constants");
const { Verify_JWT_Token } = require("../Utils/jwt.token");
const userModel = require("../Models/user.model");

// for authentication
module.exports.Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      return next(httpErrors.Unauthorized(errorConstant.NOT_AUTHENTICATED));
    }

    const decode = await Verify_JWT_Token(access_token);
    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    const userExist = await userModel.findById(decode.id);
    if (!userExist) {
      return next(httpErrors.NotFound(errorConstant.EMAIL_NOT_FOUND));
    }
    req.userid = userExist._id;
    req.role = userExist.role;
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return next(httpErrors.Unauthorized(errorConstant.NOT_AUTHORIZED));
    }
    next();
  };
};
