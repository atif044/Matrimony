const jwt=require('jsonwebtoken');
const express=require('express')
const verifyJwt=(req,res,next)=>{
<<<<<<< HEAD
    const authToken=req.headers['authorization']
=======
<<<<<<< HEAD
    const authToken=req.headers['authorization']||req.cookies.Authorization
=======
    const authToken=req.headers['authorization']
>>>>>>> origin/main
>>>>>>> f0c1194 (Backend 70%-80%)
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const token=authToken.split(' ')[1]
      try {
          const data= jwt.verify(token,process.env.JWT_SECRET);
          req.data=data;
          return next();
      } catch (error) {
        res.status(403).json("You Are UNauthorized");
      }
}
module.exports=verifyJwt;