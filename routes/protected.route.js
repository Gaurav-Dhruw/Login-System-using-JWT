const express = require("express");
const router = express.Router();
const User = require("../models/User");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { google } = require("googleapis");



router.put("/account/password/change", async(req, res)=>{

    const newPassword= req.body.password;
    const hashedPassword= await bcrypt.hash(newPassword,10);

    const result =await User.findOneAndUpdate({email:req.payload.email},{password:hashedPassword})
    if(result){
        return res.status(200).json({message:"Password Updated !!!"});
    }

    res.status(400).json({error:"Error occured !! Try after some time"});

})


router.delete("/account/delete",async (req,res)=>{
    const email = req.payload.email;

    const result = await User.findOneAndDelete({email});
    if(result){
        console.log("/delete",result);
        return res.sendStatus(200);
    }
    res.sendStatus(400);
});

router.get("/account",async (req,res)=>{
    const email = req.payload.email;
    
    const result= await User.find({email});
    console.log("/account", result)

    if(result){
        return res.status(200).json({...req.payload})
    }
    res.send(404)
})


module.exports= router;


