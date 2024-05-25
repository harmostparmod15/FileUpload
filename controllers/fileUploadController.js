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
  }
};
