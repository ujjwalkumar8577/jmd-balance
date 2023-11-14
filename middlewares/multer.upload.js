const multer = require('multer');
const path = require('path');
const fs = require('fs');

const destinationPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath);
}

function multerUpload() {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, destinationPath);
    },
    filename: function (req, file, callback) {
      req.body.fileName = file.originalname;
      req.body.filePath = path.join(__dirname, '..', 'uploads', req.body.fileName);
      callback(null, file.originalname);
    }
  });
  const upload = multer({ storage });
  return upload;
}

module.exports = {
  multerUpload,
};