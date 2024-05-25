const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  tag: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const File = mongoose.model("File ", fileSchema);

module.exports = File;
