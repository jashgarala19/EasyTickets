const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieshowinfoschema = new Schema({
  ms_id: {
    type: String,
    required: true,
    unique: true,
  },
  ms_date_time: {
    ms_date:{
        type:String
    },ms_time:{
        type:String
    }
  },
  screen_no: {
    type: Number,
  },
  theatre_id: {
    type:Number
  },
  movie_id:{
    type:Number
  },
  ms_price: {
    type: [],
  },
seats_info:{
    total_seats:{
        type:Number
    },
    total_seats_available:{
         type:Number
    }
},
seatlayout_status:{
    type:[]
},
});

const MovieShowInfo = mongoose.model("movieshowinfo", movieshowinfoschema);
module.exports = MovieShowInfo;
