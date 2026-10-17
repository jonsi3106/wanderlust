import mongoose from "mongoose";
import { required } from "nodemon/lib/config";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:"string",
        required:true
    }
});



userSchema.plugin(passportLocalMongoose);

export const User=mongoose.model("User",userSchema); 