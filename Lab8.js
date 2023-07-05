// Import required modules
const express = require('express');
const multer = require('multer');

// Set up the Express app
const app = express();
const port = 3000;

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File name to be saved as
  }
});
const upload = multer({ storage: storage });

// Set up route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send('File uploaded successfully!');
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// Set up a basic HTML form for file upload
app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="submit" value="Upload">
    </form>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});