import mongoose from "mongoose";

const reviews= new mongoose.Schema({
username:{
    type:String,
    required:true,
    default:"newUser"
},

ratings:{
    type:Number,
    required:true,
    min:1,
    max:5,
},

comments:{
    type:String,
    required:true,
}



});

export const Review=mongoose.model("Review",reviews); 



