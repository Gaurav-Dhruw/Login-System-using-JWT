const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const crypto = require("crypto");
const { google } = require("googleapis");

const authentication = (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((result) => {
            const hashedPassword = result.password;
            console.log(hashedPassword);
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (result)
                    return res.status(200).json({ authentication: true })
                // console.log(result);
                return res.status(200).json({ authentication: false })
                // console.log(err)

            })
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: "not found" })
        })

    next();
}


const oAuth2Client= new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
        oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})




const verifyEmail = async (req, res, next) => {
    console.log("inside verify email")
    try{
    const user = req.body;
   
    const verification_token= await crypto.randomBytes(16).toString("hex");
    
    req.verification_token = verification_token;
    const verification_link= `http://localhost:8000/verify/${verification_token}`;

    const accessToken= await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "webapp.test.0506@gmail.com",
            pass: "gaurav97@gmail",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken

        }
    });
    const mailOption = {
        from: '"Verification" <webapp.test.0506@gmail.com>',
        to: user.email,
        subject: "email verfication",
        // html: emailHtml
    }

    transporter.sendMail(mailOption).then(result=>{  console.log("mail sent") }).catch(error=>{ console.log(error) });
  
    next()
    }

    catch(error){

    }

}

const checkRegistration= async(req,res, next)=>{
    console.log("inside check reg")

    // try{
        const new_user_email= req.body.email;
    
        let result=await User.findOne({email:new_user_email})
        

            console.log(result);
            
                if(result){

                    res.status(200).json({already_registered: true , message:"email is already registered"});
                    res.end()
                }
       

        else
        next();
            

    // }

    // catch(err){

        
    // }

}




    
        
    
       
         

  

module.exports = { authentication, verifyEmail, checkRegistration };