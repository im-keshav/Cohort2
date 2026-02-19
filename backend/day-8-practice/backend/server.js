const app = require("./src/app")
require("dotenv").config()



const connedcttoDB= require("./src/config/database")

connedcttoDB()

app.listen(3000,()=>{
    console.log("Server is running in port 3000");
})
