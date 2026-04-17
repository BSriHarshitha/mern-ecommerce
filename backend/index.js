const express= require("express")
const mongoose= require("mongoose")
const app= express()
const cors = require("cors")
require("dotenv").config()
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes")
const cartRoutes=require("./routes/cartRoutes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log(err)
    })

app.get("/",(req,res)=>{
    res.json({message:"server is running"})
})
app.use("/api/auth",authRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)

app.listen(5000,()=>console.log("server runns on port 5000"))