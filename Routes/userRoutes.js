const express=require('express');
const User=require('../Models/User');
const bcrypt=require('bcrypt');
const app=express();
const generateAuth=require('../Utils/generateAuth')
const verifyJwt = require('../Middleware/middleware');
const Profile=require('../Models/profile')
const multer=require('multer')
const path=require('path')
const generateRandomString=require('../Utils/generateRandomString');
//===============================SIGNUP
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
//==============================LOGIN
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
                DateofBirth:DateofBirth,
                isAdmin:user.isAdmin
            }
        }
        const authToken=generateAuth(data);
        res.setHeader('Authorization',`Bearer ${authToken}`);
        return res.status(200).json({success:true,msg:"You are logged in",Details:{Name,Email,DateofBirth}})
})
// =========================CHANGE PASSWORD
app.post('/changepwd',verifyJwt,async(req,res)=>{
    try {
        let user =await User.findById(req.data.user.id);
        let {oldPass,newPass}=req.body;
        const comparison=await bcrypt.compare(oldPass,user.Password);
        if(!comparison){
            return res.status(401).json({msg:"Old Password is incorrect"});
        }
        const salt=await bcrypt.genSalt(parseInt(process.env.SALT))
        const hashedPass=await bcrypt.hash(newPass,salt);
        await user.updateOne({Password:hashedPass});
        let saved=await user.save();
        if(saved){
        return res.status(200).json({msg:"Password Changed Successfully"});
       }
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"});
    }

})
//=================User all demographic + background details as input
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
//=============== Users Photos Upload=====================
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
             photos= await profile.updateOne({photos:profile.photos.concat(photos)})
            let saved=await profile.save()
            if(saved){
                res.status(200).json({msg:"Images Uploaded Successfully"})
            }
        }
     }

});
// ==============================Users Specific Images
app.post('/my_img',verifyJwt,async(req,res)=>{
    let userId=req.data.user.id;
    const user=await User.findById(userId);
    if(!user){
        return res.status(403).status("Unauthorized Access");
    }
    let profile=await Profile.findOne({userId});
    if(!profile){
       return res.status(200).json({msg:"No images found"})
    }
     return res.status(200).json({images:profile.photos});
});
// In this api all User with Opposite Gender details will be shown. For Example
// Male is logged in he will be able to see all the females detail and vice versa
app.post('/all_profiles',verifyJwt,async(req,res)=>{
    const userId=req.data.user.id;
    const user=await User.findById(userId).select("-Password");
    if(!user)
    {
        return res.status(403).json({msg:"invalid action"});
    }
    let gender=user.Gender==="Male"?"Female":"Male"
    const filteredData= await User.find({Gender:gender}).select("-Password");
    let allUsers=[];
    let allUsersData=[];
    filteredData.map((data)=>{
        allUsers.push(data._id)
    })
    let profile=await Profile.find({ 
        userId: { $in: allUsers }
     }).populate("userId","-Password").then((profiles)=>{
        allUsersData.push(profiles)
    }).catch((err)=>{throw err})
     res.json(allUsersData)
})
module.exports=app;