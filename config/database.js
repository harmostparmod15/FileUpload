const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("db connection successfull"))
    .catch((err) => {
      console.log("erro in db connection ", err);
      process.exit(1);
    });
};
