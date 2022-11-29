const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cityschema = new Schema({
  
  city_id: {
    type: Number,
   unique:true
  },
  city_name: {
    type: String,
    unique: true,
    
  },



});

const City = mongoose.model('city',cityschema);
module.exports=City