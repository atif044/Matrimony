const express=require('express');
const User=require('../Models/User');
const bcrypt=require('bcrypt');
const app=express();
const jwt=require('jsonwebtoken');
const verifyJwt = require('../Middleware/middleware');
const Profile=require('../Models/profile')
const multer=require('multer')
const path=require('path')
const generateRandomString=require('../Utils/generateRandomString')
//============================Sign up
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
        const salt=await bcrypt.genSalt(parseInt(process.env.SALT))
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
//=============auth generator
const generateAuth=(data)=>{
        const token=jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
        return token;
}
//==============login
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
        const data = {
            user:{
                id:user.id,
                Name:Name,
                DateofBirth:DateofBirth
            }
        }
        const authToken=generateAuth(data);
        res.setHeader('Authorization',`Bearer ${authToken}`);
        return res.status(200).json({success:true,msg:"You are logged in",Details:{Name,Email,DateofBirth}})
})
app.post('/profile',verifyJwt,async(req,res)=>{
      const user=await User.findById(req.data.user.id);
     if(!user){
        return res.status(404).json({msg:"Invalid Action"})
     }
     else{
        const userId=req.data.user.id;
        const profile= await Profile.findOne({userId});
        if(!profile){
            let DateofB=new Date(req.data.user.DateofBirth);
    let Age=(parseInt((Date.now()-DateofB) / (1000 * 60 * 60 * 24 * 365.25)))
            const obj={...req.body,userId:req.data.user.id,Age};
            const created=await Profile.create(obj)
            if (created){
                res.status(200).json({msg:"Successfuly Added the details"});
            }
        }
        else{
            let DateofB=new Date(req.data.user.DateofBirth);
            let Age=(parseInt((Date.now()-DateofB) / (1000 * 60 * 60 * 24 * 365.25)))
            const obj={...req.body,userId:req.data.user.id,Age:Age};
            
            let updated=await Profile.findOneAndUpdate({userId},obj);
                if (updated){
                    return res.status(200).json({msg:"Successfuly Updated Your Profile"})
                }   
        }
     }
})
//===============Photos Upload=====================
const fullPath=path.join(process.env.FULLPATH,"/Matrimony/Photos")

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, fullPath);
    },
    filename: function (req, file, cb) {
        let d=new Date()
      const uniqueSuffix =`${generateRandomString(10)}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix +fileExtension.toLowerCase());
    },
})
const upload = multer({ storage: storage });
app.post('/upload_img',verifyJwt,upload.array('images',8),async(req,res)=>{
    let photos=[];
    req.files.map((obj)=>{
        photos.push(`${obj.destination}/${obj.filename}`)
    })
    const user=await User.findById(req.data.user.id);
     if(!user){
        return res.status(404).json({msg:"Invalid Action"})
     }
     else{
        const userId=req.data.user.id;
        const profile= await Profile.findOne({userId});
        if(!profile){
               const created=await Profile.create({userId,photos})
            if (created){
                res.status(200).json({msg:"Images Uploaded Successfully"});
            }
        }
        else
        {
            let profile=await Profile.findOne({userId});
             photos= 
            await profile.updateOne({photos:profile.photos.concat(photos)})
            let saved=await profile.save()
            if(saved){
                res.status(200).json({msg:"Images Uploaded Successfully"})
            }
        }
     }

});
module.exports=app;