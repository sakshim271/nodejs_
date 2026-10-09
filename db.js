const mongoose = require('mongoose');
require('dotenv').config();



const mongoUrl=process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoUrl)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err));


const db= mongoose.connection;

//define event Listeners for database connection

db.on('connected',()=>{
    console.log("connected to mongodb server")
});

db.on('disconnected',()=>{
    console.log("disconnected to mongodb server")
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

// db.on('error',()=>{
//     console.log("mongodb connection error")
// });

module.exports=db;