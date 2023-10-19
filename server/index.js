const db=require('./db/db')
require('dotenv').config()
const cors = require('cors');
const cookieParser=require('cookie-parser')
const path=require("path")
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
const adminAuth=require('./Routes/adminRoutes')
app.use(express.json());
app.use(cors({ origin: 'https://atif044.github.io', credentials: true }))
app.options('*',cors())
app.use(cookieParser())
app.listen(5000)

db();
app.use('/api/auth', auth);
app.use('/api/auth/admin',adminAuth)
