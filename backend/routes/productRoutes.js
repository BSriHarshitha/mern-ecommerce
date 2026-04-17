const express= require("express")
const router=express.Router() 
const {protect,authorize}=require("../middleware/authMiddleware")
const Product=require("../models/Product")

router.post("/add",protect,authorize,async(req,res)=>{
    try{
        const {name,price,image,description}=req.body
        const newProduct=await Product.create({
            name,image,price,description
        })
        return res.status(201).json({message:"Product added successfully"})
    }
    catch(err){
        console.log("error from add product",err)
        return res.status(500).json({message:`error from add product ${err}`})
    }
})

router.get("/",async (req,res)=>{
    try{
        const products=await Product.find()
        return res.status(200).json(products)
    }
    catch(err){
         console.log("error from get product",err)
        return res.status(500).json({message:`error from get product ${err}`})
    }
})



module.exports=router