const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      enum: ["HR", "Manager", "Sales"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    course: {
      type: String,
      required: true,
      enum: ["MCA", "BCA", "BSC"],
    },
  },
  { timestamps: true }
);

const employeeModel = mongoose.model("employee", ModelSchema);

module.exports = employeeModel;
