const express = require("express");
const UserModel = require("../models/user.model");
require("dotenv").config()
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

const userRouter = express.Router()

userRouter.post("/register",  async(req,res) => {

    try {
        const {name, email, password, role} = req.body
    
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are required"});
        }
    
        const user = await UserModel.findOne({email:email});
    
        if(user){
            return res.status(400).json({message:"User already exists, please try logging in "})
        }
    
        const hash = bcrypt.hashSync(password, 10);
    
        const new_user = await UserModel.create({name, email, password:hash, role})
    
        res.status(201).json({message:"User registered successfully", new_user})
    } catch (error) {
        res.status(500).json({message:"Error registering user", error})
    }

})


userRouter.post("/login", async(req,res) => {

    try {
        const {email, password} = req.body
    
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
    
        const user = await UserModel.findOne({email});
    
        if(!user){
            return res.status(400).json({message:"Login failed"})
        }
    
        const hashed_pass = user.password

        const ispassword = await bcrypt.compare(password, hashed_pass);
    
        if(!ispassword){
            return res.status(400).json({message:"Invalid credentials"})
        }
       
        var token = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
    
        res.status(200).json({message:"Login Successful", token:token, role: user.role})
    } catch (error) {
        res.status(500).json({message:"Error logging in ", error})
    }
})

module.exports = userRouter
