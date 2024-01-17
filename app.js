const bodyParser = require("body-parser");
const express = require("express")
const mongoose = require("mongoose")
const app = express();
// connecting to mongodb
mongoose.connect("mongodb://localhost:27017/Samplee").then(()=>{
    console.log("connected");
    }).catch((error)=>{
        alert("somthing want wrong")
    })
    
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

const productschema = new mongoose.Schema({
    name:String,
    discription:String,
    price:Number,
})

const Collection = new mongoose.model("Collection", productschema)
// crate produc
app.post("/api/v1/newproduct", async (req,res)=>{
      // if we want to make implement into api then we can use {req.boy}
  const pproduct = await  Collection.create(req.body)
  res.status(200).json({
    success : true,
    pproduct
  })
})

// read product
app.get("/api/v1/readproduct", async (req,res)=>{
    const readproduct = await  Collection.find();

    res.status(200).json({success:true, readproduct})

})

// update product
app.put("/api/v1/product/:id", async (req, res) => {
    // first we find the product using id
      let updateproduct = await Collection.findById(req.params.id);
  // then we update the product 
      updateproduct = await Collection.findByIdAndUpdate(
        req.params.id,
        // if we want to make implement into api then we can use {req.boy}
        req.body,
        {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }
      );
  
      res.status(200).json({ success: true, updateproduct });
    
  });
  
//   delete product

app.delete("/api/v1/productdelte/:id", async (req,res)=>{
    const deleproduct = await Collection.findById(req.params.id)
if (!deleproduct) {
    return res.status(500).json({
        success: false ,
         message : "product is not found"
    })
}
await deleproduct.deleteOne();
    
    res.status(200).json({ success: true , message : "product is deleted"})


})

// server craeting
app.listen(4500,()=>{
console.log("server active http://localhost:4500/");
})