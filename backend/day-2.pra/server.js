const express = require("express")
const app = express() //server instance create krna

app.get("/", (req, res) => {

  res.send("Hello World")
})

app.get("/about", (req, res) => {      
    res.send("About Page")
})

app.get("/contact", (req, res) => {
    res.send("Contact Page")
})  


app.listen(3000) // server start krna