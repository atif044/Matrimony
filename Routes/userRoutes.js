const express=require('express');
const User=require('../Models/User')
const bcrypt=require('bcrypt')
const app=express();
app.post('/signup',async (req,res)=>{
    try {
        const {Name,Email,Password,Gender,DateofBirth}=req.body;
        let DateofB=new Date(DateofBirth);
        if(((Date.now()-DateofB) / (1000 * 60 * 60 * 24 * 365.25))<18){
            return res.status(403).json({message:"Forbidden User is Under Age"})
        }
        const usr=await User.findOne({Email})
        if(usr){
            return res.status(400).json({success:false,msg:"Email is already registered"});
        }
        // console.log(typeof(process.env.SALT.toNumber()))
        const salt=await bcrypt.genSalt(parseInt(process.env.SALT))
        console.log("here")
         const hashedPass=await bcrypt.hash(Password,salt);
        const created =await User.create({
            Name,Email,Password:hashedPass,Gender,DateofBirth
        })
        if(created){
            res.status(201).json({success:true,msg:"User Created",created})
        }
    } catch (error) {
     res.status(500).json({msg:"Internal Server Error",error})   
    }
})

app.post('/login',async(req,res)=>{
        const {Email,Password}=req.body;
        let user=await User.findOne({Email})
        if(!user){
            return res.status(400).json({success:false,msg:"Email or Password is Incorrect"});
        }
        let PWDCOMP=await bcrypt.compare(Password,user.Password);
        if(!PWDCOMP)
        {
            return res.status(400).json({success:false,msg:"Email or Password is Incorrect"});
        }
        if(user.isApproved===false){
            return res.status(403).json({success:false,msg:"You are not approved by admin till now PLease Wait"});
        }
        const {Name,DateofBirth}=user;
        return res.status(200).json({success:true,msg:"You are logged in",Details:{Name,Email,DateofBirth}})
})

module.exports=app;