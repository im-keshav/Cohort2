const mongoose=require("mongoose")

function connecttodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to db");
        
    })
}

module.exports=connecttodb