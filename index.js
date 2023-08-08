const db=require('./db/db')
require('dotenv').config()
<<<<<<< HEAD
=======
<<<<<<< HEAD
const cors = require('cors');
const cookieParser=require('cookie-parser')
=======
>>>>>>> origin/main
>>>>>>> f0c1194 (Backend 70%-80%)
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
const adminAuth=require('./Routes/adminRoutes')
app.use(express.json());
<<<<<<< HEAD
=======
<<<<<<< HEAD
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
=======
>>>>>>> origin/main
>>>>>>> f0c1194 (Backend 70%-80%)
db();
app.use('/api/auth', auth);
app.use('/api/auth/admin',adminAuth)
app.listen(process.env.PORT)
