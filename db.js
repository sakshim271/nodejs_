const mongoose = require('mongoose');
// Define the MOngoDb connection URL
const mongoUrl = 'mongodb://localhost:27017/hotels' // Replace with your database name

// set up mongodb connection

mongoose.connect(mongoUrl)

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

db.on('error',()=>{
    console.log("mongodb connection error")
});

module.exports=db;