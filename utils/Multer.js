const multer = require('multer')

// Set up Multer storage and file filtering
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file with a unique name
    }
  });
  
  const fileFilter = function (req, file, cb) {
    // Filter the files based on file types if needed
    // For example, to only allow JPEG and PNG files:
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Unsupported file type'), false); // Reject the file
    }
  };

//const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = {
    upload: upload,
}