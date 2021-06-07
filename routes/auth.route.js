const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")

router.post("/login", (req, res) => {
    // res.status(200).json({})
});

router.post("/signup", async (req, res) => {
    console.log("inside route signup")

    const { user_name, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
       
       bcrypt.hash(password, salt, (err, hashedPassword) => {
            const new_user = new User({
                user_name,
                email,
                password: hashedPassword,
                verification_token: req.verification_token
            })
            new_user.save()
                .then(() => {
                    console.log("data saved")
                    res.status(200).json({ data: req.body })
                })
                .catch((err) => console.log(err, "error while saving"))

        });

    });

})


router.get("/verify/:verification_token", (req, res) => {
    const verification_token = req.params.verification_token;
    User.findOneAndUpdate({ verification_token }, { verified: true }).then(result => {
        res.status(200).json({ result }).catch(err => console.log(err));
    })
})


module.exports = router;