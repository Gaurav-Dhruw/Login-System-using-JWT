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
            const refresh_token=jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
            return res.status(200).json({user_data:payload, refresh_token, access_token })
            }
    
            return res.status(403).json({error:"Password is Incorrect"})

        }
        return res.status(403).json({error:"This email is not yet verified"});

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
const sendEmail = async (req, res, next) => {

    try{
    console.log("inside verify email")

    const user = req.body;

    const verification_link = req.protocol + '://' + req.get('host') + "/verify/" + req.verification_token;


    const accessToken = await oAuth2Client.getAccessToken();
    console.log("gmail accesss token ",accessToken)
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
    // console.log(emailHtml)

    const mailOption = {
        from: '"Login Manager" <webapp.test.0506@gmail.com>',
        to: user.email,
        subject: "Complete email verfication",
        html: emailHtml
    }

    
        await transporter.sendMail(mailOption);
        console.log("mail sent");

        next();
    }
    catch(error){

        console.log(error)
        res.status(400).json({ message: "Email not Sent" });
        res.end();
    }
        
       
   



}

// Add new user to DB
const addNewUser = async (req, res, next) => {
    console.log("INSIDE ADD New user")
    try{
        const { user_name, email, password } = req.body;
        const verification_token = crypto.randomBytes(16).toString("hex");
        console.log(verification_token);
        const salt = await bcrypt.genSalt(10);
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
               
                req.verification_token=verification_token;

                req.user_data = {user_name:result.user_name,email:result.email, verified:result.verified};
                next()
            })
            .catch((err) => {
                console.log(err, "error while saving");
                res.status(400).json({ message: "Email already registered !!!" })
                res.end;
            })

    }catch(error){
        console.log(err, "DB error");
        res.status(400).json({ message: "Error occured while registering" })

        res.end;
    }
   
}


// Check for access token to provide further access to procted links;
const autherization=(req,res,next)=>{
    try{
        const access_token= req.headers.authorization.split(" ")[1];
        console.log("autherization",access_token);
        jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
            if(err) return res.sendStatus(401);
            const newPayload={email:payload.email, user_name:payload.user_name}
            req.payload= newPayload;
            next();    
        })
    } 
    catch(error){
        return res.sendStatus(401);
    }
}

// generate acces token 
const genAccessToken=(req,res,next)=>{
    const refresh_token= req.body.refresh_token;
    console.log("gen access token", refresh_token)
    jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
        // console.log(payload)
        if(payload){
            const {email,user_name}=payload; 
            const access_token=jwt.sign({email,user_name},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '10m' });
            return res.status(200).json({access_token})
        }
        res.sendStatus(400);

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



module.exports = { authentication, sendEmail, addNewUser, autherization, genAccessToken };