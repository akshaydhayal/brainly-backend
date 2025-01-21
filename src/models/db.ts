import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    contents:[{type:mongoose.Types.ObjectId,ref:"Content",default:[]}]
})

const contentSchema=new mongoose.Schema({
    title:{type:String,required:true},
    type:{type:String, enum:['tweet','youtube','document','link'],required:true},
    link:{type:String,required:true},
    tags:[String]
})

const shareSchema=new mongoose.Schema({
    link:String,
})

export const UserModel=mongoose.model('User',userSchema);
export const ContentModel=mongoose.model('Content',contentSchema);
