const db=require('./db/db')
require('dotenv').config()
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
const adminAuth=require('./Routes/adminRoutes')
app.use(express.json());
db();
app.use('/api/auth', auth);
app.use('/api/auth/admin',adminAuth)
app.listen(process.env.PORT)
