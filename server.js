const express = require("express");
const mongoose  = require ("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const {authentication, verifyEmail, checkRegistration } = require("./middlewares/auth.js");
const app= express();

app.use(express.json());
app.use(cors());
app.use("/api/login",authentication);
app.use("/api/signup",[checkRegistration,verifyEmail]);
app.use('/api', authRoute);

const port= process.env.PORT || 5000;
app.get("/",(req,res)=>{
    console.log(req.body)
    res.status(200).send("HOME")
})
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>{
    console.log("database connected");
    app.listen(port ,()=>{
        console.log(`server is listening on ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})

