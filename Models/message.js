const mongoose=require('mongoose');
const message=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Message",message);