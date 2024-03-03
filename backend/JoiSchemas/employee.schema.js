const Joi = require("joi");

module.exports.EmployeeAddValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required().lowercase(),
    mobile: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    designation: Joi.string().required().valid("HR", "Manager", "Sales"),
    gender: Joi.string().required().valid("male", "female"),
    course: Joi.string().required().valid("MCA", "BCA", "BSC"),
    ProfileAvatar: Joi.object(),
  });
  return schema.validate(body);
};

module.exports.EmployeeUpdateValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    mobile: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/),
    designation: Joi.string().valid("HR", "Manager", "Sales"),
    gender: Joi.string().valid("male", "female"),
    course: Joi.string().valid("MCA", "BCA", "BSC"),
  });
  return schema.validate(body);
};
