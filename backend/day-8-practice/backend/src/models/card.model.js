const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    image_URL:String,
    heading:String,
    description:String,
})

const CardModel = mongoose.model("card",cardSchema)

module.exports=CardModel