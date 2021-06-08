const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {authentication, genAccessToken} =require("../middlewares/auth")



router.post("/login",authentication, (req, res) => {

});

router.post("/signup", (req, res) => {
    console.log("inside route signup")
    res.status(201).json(req.user_data);
})


router.get("/verify/:verification_token", async (req, res) => {
    const verification_token = req.params.verification_token;
    const result =await User.findOneAndUpdate({ verification_token }, { verified: true});
    console.log(result);
   
    if(result) {
        
       
        const payload = {user_name:result.user_name, email: result.email}
        console.log(result);
        const access_token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '10m' });
        const refresh_token=jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1h' });

        return res.status(200).json({ access_token, refresh_token,verified:true });
    }
        
    res.status(400).send()
    
    
})

router.get("/gen/accesstoken",genAccessToken,(req,res)=>{

}
)

router.get("/login/auto",genAccessToken,(req,res)=>{
    

})




module.exports = router;