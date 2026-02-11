const app = require('./src/app');

const mongoose = require('mongoose');

// function connectTOdb(){
//     mongoose.connect(process.env.MONGO_URI)
//     .then(()=>{
//         console.log("Connected to DB");
//     })
// }

// connectTOdb();

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
    console.log("Connected to DB");
})
}
connectToDb();



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

