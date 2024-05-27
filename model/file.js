const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporterInstance = require("../config/mailTransporter");

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

// post middleware : nodemailer
fileSchema.post("save", async function (doc) {
  try {
    // mail send
    let info = await transporterInstance.sendMail({
      from: "Parmod Gang",
      to: doc.email,
      subject: "File uploaded to cloudinary",
      html: `<h1>File Uploaded!!</h1>
       <p>we r blessed to upload your file on cloud for backups</p>
        <br/>
        <a href = "${doc.imageUrl}">View Here</a>
      `,
    });
  } catch (error) {}
});

const File = mongoose.model("File ", fileSchema);

module.exports = File;
