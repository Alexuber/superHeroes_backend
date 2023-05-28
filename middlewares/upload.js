// const multer = require("multer");
// const path = require("path");

// const tempDir = path.resolve("temp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "_" + uniquePrefix + ".jpg");
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniquePrefix + ".jpg");
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    // Allowed file formats
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

    // Check if the file format is allowed
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error(
          "Invalid file format. Only JPG, JPEG, PNG, and WEBP formats are allowed."
        )
      );
    }
  },
});

module.exports = upload;
