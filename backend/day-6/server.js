const app = require('./src/app');

const mongoose = require('mongoose');

// function connectTOdb(){
//     mongoose.connect("mongodb+srv://keshav:iETHCQtfSjEL1JHl@cluster0.2ftdc2p.mongodb.net/day-6")
//     .then(()=>{
//         console.log("Connected to DB");
//     })
// }

// connectTOdb();

function connectToDb() {
    mongoose.connect("mongodb+srv://keshav:iETHCQtfSjEL1JHl@cluster0.2ftdc2p.mongodb.net/day-6")
        .then(()=>{
    console.log("Connected to DB");
})
}
connectToDb();



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

