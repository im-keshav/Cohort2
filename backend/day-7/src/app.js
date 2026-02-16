const express = require('express');


const noteModel = require('./models/notes.model');
const app = express();

app.use(express.json())


app.post("/notes", async (req,res)=>{

    const {title,description,age} = req.body
    const notes = await noteModel.create({
        title, description,age
    })


    res.status(201).json({
        message:"Notes created successfully",
        notes
    })



})

app.get("/notes",async (req,res)=>{

    const notes = await noteModel.find({
    })
    res.status(200).json({
        messsage:"Notes fetched successfully",
        notes
    })
})

module.exports = app;