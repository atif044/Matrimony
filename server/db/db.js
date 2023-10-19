const mongoose=require('mongoose');
require('dotenv').config()
const connectToMongo=async()=>{
    const connection=await mongoose.connect(`${process.env.HOST}/${process.env.db}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    if(!connection) throw new Error;
    console.log("Connection Success")
}
module.exports=connectToMongo
