const express = require('express');


const noteModel = require('./models/notes.model');
const app = express();

app.use(express.json())


app.post("/notes", async (req,res)=>{

    const {title,description,age} = req.body
    const note = await noteModel.create({
        title, description,age
    })


    res.status(201).json({
        message:"Notes created successfully",
        note 
    })



})

app.get("/notes",async (req,res)=>{

    const note = await noteModel.find({
        title , description,age
    })
    res.status(200).json({
        messsage:"Notes fetched successfully",
        note
    })
})

module.exports = app;