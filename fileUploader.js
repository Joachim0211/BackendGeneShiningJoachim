const multer = require("multer");
const path = require("path");

const uploadFolder = path.resolve("public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});
const isPicture = ({ originalname, mimetype }) => {
  const allowedMimeTypes = ["text/plain"];
  return (
    originalname.match(/\.(txt|TXT)$/) && allowedMimeTypes.includes(mimetype)
  );
};

const fileFilter = (req, file, cb) => {
  if (!isPicture(file)) {
    req.fileValidationError = "Only text files are allowed!";
    return cb(new Error("Only text files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
