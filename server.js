const express = require("express");
const mongoose  = require ("mongoose");
const cors = require("cors");
const path =require("path")
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const { verifyEmail, addNewUser, autherization} = require("./middlewares/auth.js");


const app= express();

app.use(express.json());
app.use(cors());

app.use("/api/protected",autherization);

app.use("/api/signup",[addNewUser,verifyEmail]);
app.use('/api', authRoute);

const port= process.env.PORT || 5000;

app.get("/",(req,res)=>{
    console.log(req.body)
    res.status(200).send("HOME")
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("/client/build"));
    app.get("*",(req,res)=>{
        res.status(200).send(path.resolve(__dirname,"client","build","index.html"))
    })
}
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false })
.then(()=>{
    console.log("database connected");
    app.listen(port ,()=>{
        console.log(`server is listening on ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})

