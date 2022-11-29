const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  first_Name: {
    type: String,
  },
  last_Name: {
    type: String,
  },
  Email: {
    type: String,

  },
  Mobile_No: {
    type: Number,
    unique: true,
  },
  Password: {
    type: String,
  },
  Movies_Booked:{
    type:[]
  }
});

const User = mongoose.model("user", userschema);
module.exports = User;
