const express = require("express")

const NoteModel = require("./models/note.model")
const cors = require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.post("/api/note",async (req ,  res)=>{
    const {title,description}= req.body
    
    const notes = await NoteModel.create({
        title,description
    })


    res.status(201).json({
        message:"Note created successfully",
        notes
    })



})

app.get("/api/note",async (req,res)=>{
    
    const notes = await NoteModel.find()
    
    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})


app.delete("/api/note/:id",async (req,res)=>{
    const id= req.params.id

    const notes = await NoteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully",
        notes
    })
})

app.patch("/api/note/:id",async (req,res)=>{
    const id= req.params.id
    const {title,description}= req.body

    const notes = await NoteModel.findByIdAndUpdate(id,
        {
            title,description
        },
        {new:true}
    )

    res.status(200).json({
        message:"Note updated successfully",
        notes
    })
})

module.exports=app