const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const crypto = require("crypto");
const { google } = require("googleapis");
const pug =require("pug");
const path = require("path");

const express = require("express");
const app= express();

//To verify user and password during login
const authentication = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;


    try {

        const result = await User.findOne({ email: email });
        const authentication = await bcrypt.compare(password, result.password);
        if(result.verified){

            if(authentication){
                const payload = {user_name:result.user_name, email: result.email}
            console.log(result);
            const access_token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '10m' });
            const refresh_token=jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1h' });
            return res.status(200).json({user_data:payload, refresh_token, access_token })
            }
    
            return res.status(403).json({error:"Password is Incorrect"})

        }
        return res.status(401).json({error:"This email is not yet verified"});

    } 

    catch (err) {
        res.status(404).json({error:"Email is not registered"});
    }

    next();
}

// OAUTH2 setup for using gmail 
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


// Sends an email with verification link
const verifyEmail = async (req, res, next) => {
    console.log("inside verify email")

    const user = req.body;


    const verification_link = req.protocol + '://' + req.get('host') + "/verify/" + req.verification_token;


    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "webapp.test.0506@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken

        }
    });
    const emailHtml=  pug.renderFile(path.resolve(app.get("views"),"email.pug"),{verification_link});
    console.log(emailHtml)

    const mailOption = {
        from: '"Verification" <webapp.test.0506@gmail.com>',
        to: user.email,
        subject: "email verfication",
        html: emailHtml
    }

    transporter.sendMail(mailOption)
        .then(result => {
            console.log("mail sent");
            next();
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({ message: "Email not Sent" });
            res.end();
        });



}

// Add new user to DB
const addNewUser = async (req, res, next) => {

    const { user_name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    const verification_token = crypto.randomBytes(16).toString("hex");
    console.log(verification_token);

    const hashedPassword = await bcrypt.hash(password, salt);
    const new_user = new User({
        user_name,
        email,
        password: hashedPassword,
        verification_token
    })
    new_user.save()
        .then((result) => {
            console.log("data saved")
           

            req.verification_token = verification_token;
            req.user_data = {_id:result._id,user_name:result.user_name,email:result.email, verified:result.verified};
            next()
        })
        .catch((err) => {
            console.log(err, "error while saving");
            res.status(200).json({ message: "Email already registered !!!" })
            res.end;
        })
}


// Check for access token to provide further access to procted links;
const autherization=(req,res,next)=>{
    const access_token= req.headers.Authorization.split(" ")[1];
    jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err) return res.send(401);
        req.payload= payload;
        next();    
    })
}

// generate acces token 
const genAccessToken=(req,res,next)=>{
    const refresh_token= req.body.refresh_token;
    jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
        if(payload){
            const access_token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '10m' });
            res.status(200).json({access_token})
        }
        next();
})
}




// const checkRegistration = async (req, res, next) => {
//     console.log("inside check reg")

//     const new_user_email = req.body.email;

//     let result = await User.findOne({ email: new_user_email })

//     if (result) {
//         res.status(200).json({ already_registered: true});
//         res.end()
//     }
//     else
//         req.already_registered=false;
//         next();


// }



module.exports = { authentication, verifyEmail, addNewUser, autherization, genAccessToken };