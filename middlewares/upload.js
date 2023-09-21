const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const filename = file.fieldname + "_" + uniquePrefix + fileExtension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file format. Only JPG, JPEG, PNG, and WEBP formats are allowed."
        )
      );
    }
  },
  limits: {
    fileSize: 2048 * 2048,
  },
});

upload.filename = (req, file, cb) => {
  const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileExtension = path.extname(file.originalname);
  const filename = file.fieldname + "_" + uniquePrefix + fileExtension;

  cb(null, filename);
  return filename;
};

module.exports = upload;
