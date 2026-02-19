const express =  require("express")
const CardModel = require("./models/card.model")
const cors = require("cors")

const path = require("path")


const app = express()
app.use(cors())
app.use(express.static("./public"))
app.use(express.json())

app.post("/api/card",async (req,res)=>{
    const {image_URL,heading,description,action}= req.body
    const card =  await CardModel.create({
        image_URL,
        heading,
        description
    })

    res.status(201).json({
        message:"Card created successfully",
        card
    })
})
app.post("/api/card/bulk",async(req,res)=>{
    const {cards} = req.body

    const card = await CardModel.insertMany(cards)

    res.status(201).json({
        message:"Cards created successfully",
        card
    })
})

app.get("/api/card",async(req,res)=>{
    const card=await CardModel.find()

    res.status(200).json({
        message:"Cards fetched successfully",
        card
    })
})
   
app.delete("/api/card/:id",async(req,res)=>{
    const id = req.params.id

    const card = await CardModel.findByIdAndDelete(id)
    
    res.status(200).json({
        message:"Card deleted successfully",
        card
    })
})

app.patch("/api/card/:id",async(req,res)=>{
    const id = req.params.id
    const {image_URL,heading,description,}= req.body

    const card=await CardModel.findByIdAndUpdate(id,{
        image_URL,
        heading,
        description,
    
    })

    res.status(200).json({
        message:"Card updated successfully",
        card
    })
})

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});



module.exports=app