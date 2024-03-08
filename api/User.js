const express = require('express');
const router = express.Router();

//mongoose user module
const User = require('./../models/User');

//password handler
const bcrypt = require('bcrypt');

//signup
router.post('/signup', (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if ( name=="" || email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields !"
        });
    }else if (!/^[a-zA-Z ]+$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Inavalid name entered !"
        });
    }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Inavalid email entered !"
        });
    }else if (password.length < 8){
        res.json({
           status: "FAILED",
           message: "Password must be at least 8 characters long !" 
        });
    }else {
        //check if user alrady exists
        User.find({email}).then((user) => {
            if (user.length) {
                //if the user already exists
                res.json({
                    status: "FAILED",
                    message: "User with this email already exists !"
                })
            }else {
                //try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User ({
                        name,
                        email,
                        password: hashedPassword
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "User created successfully !",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while saving user !"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing password !"
                    })
                });
            }
        }).catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user!"
            });
        });
    }
})


//signin
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields !"
        })
    }else{
        //check if user exists
        User.find({email})
        .then(data =>{
            if (data.length){
                //if user exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result =>{
                    if (result){
                        //password matched
                        res.json({
                            status: "SUCCESS",
                            message: "User signed in successfully !",
                            data: data
                        })
                    }
                })
                .catch(err=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while comparing passwords !"
                    })
                })
            }else {
                res.json({
                    status: "FAILED",
                    massage: "Invalid credentials"
                })
            }
        })
        .catch(err =>{
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user !"
            })
        })
    }
})

module.exports = router;