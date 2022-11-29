const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement =require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/theatredb");
 
autoIncrement.initialize(connection);
const screenschema = new Schema({
  
//   screen_id: {
//     type: Number,
//     unique: true,
    
//   },
  screen_no: {
    type: Number,
    
    
  },
  theatre_id:{
    type: Number,
  
  },
  seatlayout_name:{
    type:String,
    
  }


});
// screenschema.plugin(autoIncrement.plugin,'screen_id')
screenschema.index({screen_no:1,theatre_id:1},{unique:true})
const Screen = mongoose.model('screen',screenschema);
module.exports=Screen