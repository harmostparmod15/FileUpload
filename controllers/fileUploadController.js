const cloudinary = require("cloudinary").v2;
const File = require("../model/file");

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;

    let path = __dirname + "/files/" + file.name;

    file.mv(path, (err) => {
      console.log("error in moving file ", err);
    });

    res.json({
      success: true,
      message: "local file uplaod successfully",
    });
  } catch (error) {
    console.log("error in controller ", error);
    return res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const isFileTypeSupported = (type, supportedTypes) => {
  return supportedTypes.includes(type);
};

const uploadFileToCloudinary = async (file, folder) => {
  const options = { folder, resource_type: "auto" };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// image upload
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, email, tag } = req.body;

    const file = req.files.imageFile;

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      // error
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // file format is supported
    const response = await uploadFileToCloudinary(file, "test");
    console.log("respon cloud", response);
    // save entry in database
    const fileData = await File.create({
      name,
      tag,
      email,
      imageUrl: response.secure_url,
    });
    return res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "successfully upload",
    });
  } catch (error) {
    console.log("error in image upload controller ", error);
    return res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// video upload

exports.videoUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tag, email } = req.body;

    const file = req.files.videoFile;
    console.log("video file", file);

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      // error
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // file format is supported
    const response = await uploadFileToCloudinary(file, "test");
    console.log("respon cloud", response);
    // save entry in database
    const fileData = await File.create({
      name,
      tag,
      email,
      imageUrl: response.secure_url,
    });
    return res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "successfully upload",
    });
  } catch (error) {
    console.log("error in video upload controller", error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
