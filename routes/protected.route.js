const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const crypto = require("crypto");
const { google } = require("googleapis");

router.get("/logout",(req,res)=>{


    
        return res.status(200).json({logout:true});
        

    
})

router.get("/account", (req, res)=>{
    
    return res.status(200).json({login:true});

})



