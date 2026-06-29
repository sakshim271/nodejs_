const mongoose = require('mongoose');
require('dotenv').config();

// Define the MOngoDb connection URL
// const mongoUrl = 'mongodb://localhost:27017/hotels' // Replace with your database name

//const mongoURL=process.env.MONGODB_URL_LOCAL;
const mongoUrl=process.env.MONGODB_URL;
 // set up mongodb connection
// mongoose.connect(mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// get default connection 
// mongoose maintains a default connection object respresenting the Mongodb connection
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