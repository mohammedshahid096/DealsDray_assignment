const httpErrors = require("http-errors");
const { errorConstant, successConstant } = require("../Utils/constants");
const {
  EmployeeAddValidation,
  EmployeeUpdateValidation,
} = require("../JoiSchemas/employee.schema");
const employeeModel = require("../Models/employee.model");

// add employee
module.exports.AddEmployeeController = async (req, res, next) => {
  try {
    const { error } = EmployeeAddValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const image = req.file;
    if (!image) {
      return next(httpErrors.BadRequest("employee image required"));
    }
    const isEmailExist = await employeeModel.findOne({ email: req.body.email });
    if (isEmailExist) {
      return next(httpErrors.BadRequest(errorConstant.EMAIL_EXIST));
    }

    req.body.image = image.filename;
    const newEmployee = new employeeModel(req.body);
    await newEmployee.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.NEW_EMPLOYEE_CREATED,
      data: newEmployee,
    });
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// all employees
module.exports.AllEmployeeController = async (req, res, next) => {
  try {
    const data = await employeeModel.find();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// get specific employee
module.exports.SingleEmployeeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await employeeModel.findById(id);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.EMPLOYEE_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// update specific employee
module.exports.UpdateEmployeeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = EmployeeUpdateValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const image = req.file;
    const isEmailExist = await employeeModel.findOne({ email: req.body.email });
    if (isEmailExist) {
      return next(httpErrors.BadRequest(errorConstant.EMAIL_EXIST));
    }

    if (image) {
      req.body.image = image.filename;
    }
    const data = await employeeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.EMPLOYEE_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// update profile
module.exports.UpdateEmployeeProfileController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = req.file;

    if (!image) {
      return next(httpErrors.BadRequest("employee image required"));
    }
    const data = await employeeModel.findByIdAndUpdate(
      id,
      { image: image.filename },
      {
        new: true,
      }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.EMPLOYEE_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.DeleteEmployeeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await employeeModel.findByIdAndDelete(id);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.EMPLOYEE_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.EMPLOYEE_DELETED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.DashboardCotroller = async (req, res, next) => {
  try {
    const genderDistribution = await employeeModel.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    const designationDistribution = await employeeModel.aggregate([
      {
        $group: {
          _id: "$designation",
          count: { $sum: 1 },
        },
      },
    ]);

    const courseDistribution = await employeeModel.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },
    ]);

    const genderWiseCourse = await employeeModel.aggregate([
      {
        $group: {
          _id: { course: "$course", gender: "$gender" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          course: "$_id.course",
          gender: "$_id.gender",
          count: 1,
        },
      },
    ]);

    const genderWiseDesignation = await employeeModel.aggregate([
      {
        $group: {
          _id: { designation: "$designation", gender: "$gender" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          designation: "$_id.designation",
          gender: "$_id.gender",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      statusCode: 200,
      genderDistribution,
      designationDistribution,
      courseDistribution,
      genderWiseCourse,
      genderWiseDesignation,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
