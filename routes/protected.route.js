const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require ("bcrypt");
const { google } = require("googleapis");
const { findOneAndUpdate } = require("../models/User");

router.get("/logout",(req,res)=>{


    
        return res.status(200).json({logout:true});
        

    
})

router.post("/account/password/change", async(req, res)=>{

    const newPassword= req.body.password;
    const hashedPassword= await bcrypt.hash(newPassword,10);

    const result =await findOneAndUpdate({email:req.payload.email},{password:hashedPassword})
    if(result){
        return res.send(200).json({message:"Password Updated"});
    }

    res.send(400);



})



