const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminschema = new Schema({
  
  admin_id: {
    type: Number,
    required: true,
  },
  admin_uname: {
    type: String,
    unique: true,
    
  },
  admin_password:{
    type: String,
  
  },
  theatre_id:{
    type:Number,
    
  }


});

const Admin = mongoose.model('admin',adminschema);
module.exports=Admin