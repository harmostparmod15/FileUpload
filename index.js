const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const db = require("./config/database.js");
const cloudinary = require("./config/cloudinary.js");
const upload = require("./routes/fileUpload.js");
const PORT = process.env.PORT || 3000;

const app = express();

// middleware for extracting request body
app.use(express.json());

// file upload middleware
app.use(fileUpload());

// mongodb connection
db.connectDb();

// cloudinary connection
cloudinary.cloudinaryConnect();

// routes for file upload
app.use("/api/v1/upload", upload);

// activate server
app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`);
});
