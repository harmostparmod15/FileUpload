const express = require("express");
const {
  localFileUpload,
  imageUpload,
  videoUpload,
} = require("../controllers/fileUploadController");

const router = express.Router();

// routes mapping with their controllers
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;
