const db=require('./db/db')
require('dotenv').config()
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
app.use(express.json());
db();
app.use('/api/auth', auth);

app.listen(process.env.PORT)
