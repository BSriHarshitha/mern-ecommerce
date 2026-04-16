const express= require("express")
const router=express.Router() 
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const User= require("../models/User")

router.post("/register",async (req,res)=>{
    try{
        const {name,email,password,mobile}=req.body 
        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassword,mobile
        })
        return res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        console.log("error from register",err)
        return res.status(500).json({message:"Error in server"})
    }
})


module.exports=router