const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatlayoutschema = new Schema({
  
  theatre_id: {
    type: Number,
    required: true,
  },
  seatlayout_name: {
    type: String,
    unique: true,
    
  },
  seatlayout_class:{
    type:[String]
  },
  seatlayout:{
    type:[]
  } ,
  seatlayout_structure:{
    type:[]
  },
  total_seats:{
    type:Number
  }
   

});

const SeatLayout = mongoose.model('seatlayout',seatlayoutschema);
module.exports=SeatLayout