const db=require('./db/db')
require('dotenv').config()
const cors = require('cors');
const cookieParser=require('cookie-parser')
const path=require("path")
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
const adminAuth=require('./Routes/adminRoutes')
const socketIo=require('socket.io');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.options('*',cors())
app.use(cookieParser())
const Server=app.listen(process.env.PORT)
const io=socketIo(Server,{
    cors: {
      origin: 'http://localhost:3000', // Replace with your React frontend's origin
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
io.on('connection',(socket)=>{
    console.log("User Connected:",socket.id)
    socket.on('message', (message) => {
        // Broadcast the message to all connected clients
        io.emit('message', message);
      });
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})

db();
app.use('/api/auth', auth);
app.use(express.static(path.join(__dirname,'/public/Photos')))
app.use('/api/auth/admin',adminAuth)
app.io=io;
