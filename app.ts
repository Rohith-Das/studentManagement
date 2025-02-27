import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session'
import { PORT, MONGODB_URI, SESSION_SECRET } from './config/db';
import studentRouters from './routers/studentRouters';
import path from 'path';
const app = express();


mongoose.connect(MONGODB_URI).then(()=>console.log('Connected to mongodb'))
.catch(err=> console.log("mongodb connection error",err));


app.use(
  session({
    secret: SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({ secret: "secretkey", resave: false, saveUninitialized: false }));

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use('/',studentRouters)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})