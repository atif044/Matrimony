const express=require('express');
const User=require('../Models/User');
const bcrypt=require('bcrypt');
const fs=require('fs')
const router=express.Router();
const generateAuth=require('../Utils/generateAuth')
const verifyJwt = require('../Middleware/middleware');
const Profile=require('../Models/profile')
require('dotenv').config()
const multer=require('multer')
const path=require('path')
const generateRandomString=require('../Utils/generateRandomString');
const Interest=require('../Models/interest');
const Message=require('../Models/message')
const axios=require('axios')
const FormData=require('form-data')
const{uploadToCloudinary}=require('../Utils/imageUpload')
//=============================== SIGNUP
router.post('/signup',async (req,res)=>{
    try {
        const {Name,Email,Password,Gender,DateofBirth}=req.body;
        let DateofB=new Date(DateofBirth);
        if(((Date.now()-DateofB) / (1000 * 60 * 60 * 24 * 365.25))<18){
            return res.status(403).json({error:"Forbidden User is Under Age"})
        }
        const usr=await User.findOne({Email})
        if(usr){
            return res.status(400).json({success:false,error:"Email is already registered"});   
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
//============================== LOGIN
router.post('/login',async(req,res)=>{
        const {Email,Password}=req.body;
        let user=await User.findOne({Email})
        if(!user){
            return res.status(400).json({success:false,error:"Email or Password is Incorrect"});
        }
        let PWDCOMP=await bcrypt.compare(Password,user.Password);
        if(!PWDCOMP)
        {
            return res.status(400).json({success:false,error:"Email or Password is Incorrect"});
        }
        const {Name,DateofBirth,isCompleted,isAdmin}=user;
        const data = {
            user:{
                id:user.id,
                Name:Name,
                DateofBirth:DateofBirth,
                isAdmin:user.isAdmin,
                isCompleted:isCompleted
            }
        }
        const authToken=generateAuth(data);

        
        res.cookie("icCompleted",isCompleted,{
            secure:false,
            maxAge:24 * 60 * 60 * 1000,
            // secure:true,
            // sameSite:'none',
            expires:new Date(Date.now()+24 * 60 * 60 * 1000)
        })
        res.cookie("typeAdmin",isAdmin,{
            secure:false,
            maxAge:24 * 60 * 60 * 1000,
            // secure:true,
            // sameSite:'none',
            expires:new Date(Date.now()+24 * 60 * 60 * 1000)
        })
        return res.status(200).cookie("Authorization",`Bearer ${authToken}`,{
            
            secure:false,
            maxAge:24 * 60 * 60 * 1000,
            // secure:true,
            // sameSite:'none',
            expires:new Date(Date.now()+24 * 60 * 60 * 1000)
        }).json({success:true,msg:"You are logged in",Details:{id:user._id,Name,Email,DateofBirth,isAdmin}});
})
// ========================= CHANGE PASSWORD
router.post('/changepwd',verifyJwt,async(req,res)=>{
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
//================= User all demographic + background details as input
router.post('/profile',verifyJwt,async(req,res)=>{
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
                const user=await User.findByIdAndUpdate(userId,{isCompleted:true});
                await user.save()
               return res.status(200).json({msg:"Successfuly Added the details"});
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
const storage = multer.memoryStorage(); // Store uploaded image in memory
// const storage=multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, fullPath);
//     },
//     filename: function (req, file, cb) {
//         let d=new Date()
//       const uniqueSuffix =`${generateRandomString(10)}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
//       const fileExtension = path.extname(file.originalname);
//       cb(null, file.fieldname + '-' + uniqueSuffix +fileExtension.toLowerCase());
//     },
// })
const upload = multer({ storage: storage });
router.post('/upload_img',verifyJwt,upload.array('images',8),async(req,res)=>{
    const allImages=[]
    let imgName=''
    for(const file of req.files){
      imgName = await uploadToCloudinary(file.buffer)
      allImages.push(imgName)
    }     
    const user=await User.findById(req.data.user.id);
     if(!user){
        return res.status(404).json({msg:"Invalid Action"})
     }
     else{
        const userId=req.data.user.id;
        const profile= await Profile.findOne({userId});
        if(!profile){
               const created=await Profile.create({userId,photos:allImages})
            if (created){
                res.status(200).json({msg:"Images Uploaded Successfully"});
            }
        }
        else
        {
            let profile=await Profile.findOne({userId});
             photos= await profile.updateOne({photos:profile.photos.concat(allImages)})
            let saved=await profile.save()
            if(saved){
                res.status(200).json({msg:"Images Uploaded Successfully"})
            }
        }
     }

});
//========================================Profile Picture
router.post('/upload_profile_pic',upload.single('image'),verifyJwt,async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
          }
        let imageUrl=await uploadToCloudinary(req.file.buffer)
          if(imageUrl){
            const user=await User.findByIdAndUpdate(req.data.user.id,
                {profilePic:imageUrl});
    
                if(user){
                    return res.status(200).json({msg:"Profile Picture Updated"});
                }
          }
       
        return res.status(400).json({error:"Error Uploading Profile Pic"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"});
    }

})
// ============================== Users Specific Images
router.post('/my_img',verifyJwt,async(req,res)=>{
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
router.get('/all_profiles',verifyJwt,async(req,res)=>{
    const userId=req.data.user.id;
    const user=await User.findById(userId).select("-Password");
    if(!user)
    {
        return res.status(403).json({msg:"invalid action"});
    }
    if(!user.isCompleted){
        return res.status(400).json({error:"Please Complete Your Profile First"})
    }
    if(!user.isApproved){
        return res.status(400).json({error:"Your profile needs to be approved by admin. Please wait"})
    }
    let gender=user.Gender==="Male"?"Female":"Male"
    const filteredData= await User.find({Gender:gender,isCompleted:true,isApproved:true}).select("-Password");
    let allUsers=[];
    let allUsersData=[];
    let interest=[]// if already expressed so we will not show profile again
    filteredData.map((data)=>{
        allUsers.push(data._id)
    })
    let prof=await Interest.find({Sender:userId,Receiver:{$in:allUsers}});
    let prof2=await Interest.find({Receiver:userId});
    prof2.map((data)=>interest.push(data.Sender))
    prof.map((data)=>interest.push(data.Receiver));
    allUsers = allUsers.filter(item1 => !interest.some(item2 => item2.equals(item1)));
    let profile=await Profile.find({ 
        userId: { $in: allUsers }
     }).populate("userId","-Password").then((profiles)=>{
        allUsersData.push(profiles)
    }).catch((err)=>{throw err})
     return res.json({success:true,allUsersData});
});
//================================== EXPRESS THE INTEREST
router.post('/express/:id',verifyJwt,async(req,res)=>{
    try {
        const userId=req.data.user.id;
        const receiver=req.params.id;
        let interest= await Interest.findOne({Sender:userId,Receiver:receiver});
        if(!interest){
         interest=await Interest.findOne({Sender:receiver,Receiver:userId});
         if(interest){
            return res.status(400).json({error:"This User already showed interest in you please check"})
         }
            let add=await Interest.create(
                {
                    Sender:userId,
                    Receiver:receiver
                }
            );
            if(add){
               return  res.status(200).json({msg:"Your interest has been expressed"});
            }
        }
                return res.status(301).json({msg:"You have already expressed for this user"});
    } catch (error) {
       return res.status(500).json({error:"Inrernal Server Error"});
    }
});
// ============================ ALL PERSON INTERESTED IN LOGGED IN USER
router.get('/my_fans',verifyJwt,async(req,res)=>{
try {
    const myFans=await Interest.find({Receiver:req.data.user.id,bothInterested:false}).populate("Sender","-Password");
    let allUsers=[];
    let allUsersData=[];
    myFans.map((data)=>{
            allUsers.push(data.Sender._id)
    });
    let profile=await Profile.find({ 
        userId: { $in: allUsers }
     }).populate("userId","-Password").then((profiles)=>{
        allUsersData.push(profiles)
    }).catch((err)=>{throw err})
    return res.status(200).json(allUsersData)
} catch (error) {
    return res.status(500).json({msg:"Internal Server Error"});
}
});
// ============================ CONFIRMING THE MATCH
router.put('/confirm_match/:id',verifyJwt,async(req,res)=>{
    try {
        let myFan=await Interest.findOne({Sender:req.params.id});
        await myFan.updateOne({bothInterested:true});
        let saved=await myFan.save();
        if(saved){
            return res.status(200).json({msg:"Both are interested its a match"});
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server ERROR"})
    }
});
router.get('/my_match', verifyJwt, async (req, res) => {
    try {
        // Initialize arrays to store match IDs and profiles
        const allMatchIds = [];
        const allMatchIds2 = [];
        const allMatchProfiles = [];

        // Find interests where the user is the receiver and both are interested
        const myMatch = await Interest.find({ Receiver: req.data.user.id, bothInterested: true })
            .populate('Sender', '-Password');

        // Find interests where the user is the sender and both are interested
        const myMatch2 = await Interest.find({ Sender: req.data.user.id, bothInterested: true })
            .populate('Receiver', '-Password');

        // Check if both myMatch and myMatch2 are empty
        if (myMatch2.length === 0 && myMatch.length === 0) {
            return res.status(404).json({ msg: 'No Match Found' });
        }

        // If myMatch is not empty, collect Sender IDs
        if (myMatch.length !== 0) {
            myMatch.forEach(val => allMatchIds.push(val.Sender._id));
        }
            // If myMatch2 is not empty, collect Receiver IDs
            if (myMatch2.length !== 0) {
                myMatch2.forEach(val => allMatchIds2.push(val.Receiver._id));
            }
            const singleProfile = await Profile.findOne({ userId: allMatchIds2[0] }).populate({
                path: 'userId',
                select: '-Password'
            });
            
        // Find profiles based on collected IDs
        if (allMatchIds.length > 0) {
            const profiles = await Profile.find({ userId: { $in: allMatchIds } }).populate('userId', '-Password');
            allMatchProfiles.push(profiles);
        }

        if (allMatchIds2.length > 0) {
            const profiles2 = await Profile.find({ userId: { $in: allMatchIds2 } })
            .populate({
                path: 'userId',
                select: '-Password'
            }); 
            allMatchProfiles.push(profiles2);
        }
       return res.status(200).json(allMatchProfiles);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout',verifyJwt,async(req,res)=>{
    try {
        
        res.clearCookie('typeAdmin',{
            path:'/'
        })
        res.clearCookie('icCompleted',{
            path:'/'
        })
       return res.status(200).clearCookie('Authorization',{
                    
            path:'/'

       }).json({success:true,msg:"Logged Out Successfully"})
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"})
    }
})
router.post("/MyProfile",verifyJwt,async(req,res)=>{
    try {
        let userId=req.data.user.id;
        let user = await User.findById(req.data.user.id).select("-Password");
        if(user.isCompleted){
            let user1=await Profile.findOne({userId:userId}).populate("userId","-Password");
            return res.status(200).json(user1)
        }
        return res.status(403).json({error:"Please Complete Your Profile first"});
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
})
//==============================MESSAGING ROUTES
router.post("/messaging",verifyJwt,async(req,res)=>{
    const {sender,receiver,content}=req.body;
    try {
        const message=new Message({
            content:content,
            sender:sender,
            receiver:receiver
        })
        await message.save();
        res.status(200).json("Message Sent Successfully");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
})
router.get("/allMessages/:sender/:receiver",async(req,res)=>{
    try {
        const { sender, receiver} = req.params;
    
        // Find all messages between the two users, sorted by timestamp
        const messages = await Message.find({
          $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
          ],
        }).sort({ timestamp: 1 });
        console.log(messages)

        res.status(200).json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
})
router.get('/best_matches',verifyJwt,async(req,res)=>{
    const userId=req.data.user.id;
    const user=await User.findById(userId).select("-Password");
    if(!user)
    {
        return res.status(403).json({msg:"invalid action"});
    }
    if(!user.isCompleted){
        return res.status(400).json({error:"Please Complete Your Profile First"})
    }
    if(!user.isApproved){
        return res.status(400).json({error:"Your profile needs to be approved by admin. Please wait"})
    }

    let gender=user.Gender==="Male"?"Female":"Male"
    let userProfile=await Profile.findOne({userId:user._id});
    console.log(userProfile.Interests)
    console.log(userProfile.Hobbies)
    const filteredData= await User.find({Gender:gender,isCompleted:true,isApproved:true
    }).select("-Password");
    let allUsers=[];
    let allUsersData=[];
    let interest=[]// if already expressed so we will not show profile again
    filteredData.map((data)=>{
        allUsers.push(data._id)
    })

    // if already expressed following code is for not showing that id again
    let prof=await Interest.find({Sender:userId,Receiver:{$in:allUsers}});
    let prof2=await Interest.find({Receiver:userId});
    prof2.map((data)=>interest.push(data.Sender))
    prof.map((data)=>interest.push(data.Receiver));
    allUsers = allUsers.filter(item1 => !interest.some(item2 => item2.equals(item1)));
    let profile=await Profile.find({ 
        userId: { $in: allUsers },
        $or:[
            { Hobbies: { $in: userProfile.Hobbies } },
        { Interests: { $in: userProfile.Interests } }
        ]
     }).populate("userId","-Password").then((profiles)=>{
        allUsersData.push(profiles)
    }).catch((err)=>{throw err})
     return res.json({success:true,allUsersData});
})
module.exports=router;
