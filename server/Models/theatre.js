const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theatreschema = new Schema({
  
  theatre_id: {
    type: Number,
    unique: true,
  },
  city_Name: {
    
        type:String,

    

   
    
  },
  theatre_Name:{
    type: String,
  
  },
  theatre_Address:{
    type:String,
    
  }


});

const Theatre = mongoose.model('theatre',theatreschema);
module.exports=Theatre