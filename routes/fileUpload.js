const express = require("express");
const { localFileUpload } = require("../controllers/fileUploadController");

const router = express.Router();

// routes mapping with their controllers
router.post("/localFileUpload", localFileUpload);

module.exports = router;
