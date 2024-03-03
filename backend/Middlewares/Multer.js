const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Uploading a User Profile Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const filename = uuidv4() + "." + fileType;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPG and PNG are allowed."), false);
  }
};

const ProfileUpload = multer({ storage, fileFilter }).single("ProfileAvatar");

module.exports.EmployeeProfileUpload = ProfileUpload;
