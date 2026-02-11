const app = require('./src/app');
require("dotenv").config()

const connecttoDb = require('./src/config/database');


connecttoDb();



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})