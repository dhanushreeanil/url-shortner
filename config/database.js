const mongoose = require("mongoose")

const configureDb = () =>{
    mongoose.connect("mongodb://localhost:27017/url-shortner")
    .then(() => {
        console.log("connected to db");
      })
      .catch((err) => {
        console.log("error connecting db", err);
      });
}

module.exports = configureDb