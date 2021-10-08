const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../db/User');
const keys = require('../db/keys');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken. ";
            if (err.errors.email) message += "Email already exists.";
            return res.json({
                success: false,
                message
            });
        } else {
            return res.json({
                success: true,
                message: "User registration is successful."
            });
        }
    });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "user",
                    data: {
                        _id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        contact: user.contact
                    }
                }, keys.secret, {
                    expiresIn: 604800 // for 1 week time in milliseconds
                });
                return res.json({
                    success: true,
                    token: "JWT " + token
                });
            } else {
                return res.json({
                    success: false,
                    message: "Wrong Password."
                });
            }
        });
    });
});

/* Get Authenticated user profile*/

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // console.log(req.user);
    return res.json(
        req.user
    );
});

router.get("/userinfo",async(req,res)=>{
    try{
       const getinfo = await User.find({});
   res.send(getinfo)
    }catch(e){
      res.status(201).send(e)
    }
})

router.patch("/updateuser/:_id",async(req,res)=>{
    try{
       const  _id = req.params._id;
       console.log(req.body)
       const getuser = await User.findByIdAndUpdate(_id,req.body, { new : true});
       res.send(getuser)
    }catch(e){
      res.status(500).send(e)
    }
})

router.delete("/userdelete/:id",async(req,res)=>{
    try{
       const  _id = req.params.id;
       const getuser = await User.findByIdAndDelete(req.params.id);
   res.send(getuser)
    }catch(e){
      res.status(500).send(e)
    }
})

router.get("/ownDetails/:id",async(req,res)=>{
    try{
       const  _id = req.params.id;
       const getUserDetails = await User.findById(_id);
   res.send(getUserDetails)
    }catch(e){
      res.status(201).send(e)
    }
})

module.exports = router;