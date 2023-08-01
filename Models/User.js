const mongoose =require('mongoose');
const UserSchema= new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true,
            unique:true
        },
        Password:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        DateofBirth:{
            type:Date,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        isApproved:{
            type:Boolean,
            default:false
        }
    }
)

module.exports=mongoose.model("User",UserSchema)