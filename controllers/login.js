const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');

function home (req, res, next) {
    res.render('index', { title: 'Express' }); 
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = "c7f6663f925ce99625563a31b3d33adb";
    //const JwtKey = config.get("secret.key");

    User.findOne({"email":email}).then(user => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash) => {
                if(err){
                    res.status(403).json({
                        message: "error en login 1",
                        obj:err
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        message: "Login Ok",
                        obj: jwt.sign({data:user.data, rol:user.rol, exp:Math.floor(Date.now()/1000) + 180}, JwtKey)
                    });
                } else {
                    res.status(403).json({
                        message: "error en login 2",
                        obj:null
                    }); 
                }
            });
        } else {
            res.status(403).json({
                message: "error en login 3",
                obj:null
            });
        }
    }).catch(ex => res.status(403).json({
        message: "error en login 4",
        obj:ex
    }));
}

module.exports = {home, login}