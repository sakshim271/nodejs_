const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport=require('./auth');


const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT||3000;

//Middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`);
  next();//move on to next phase
}
app.use(logRequest);

app.use(passport.initialize());

const loaclAuthMiddleware=passport.authenticate ('local',{session:false})

app.get('/',function(req, res){
  res.send('welcome to hotel NOVA')
})


// import router file
const Routes = require('./routes/menuRoutes');
app.use('/menu',Routes);
//app.use('/menu',logRequest,Routes);

// import router file
const personRoutes = require('./routes/personRoutes');
// use router
app.use('/person',personRoutes);


app.listen(3000,() => {
    console.log("listening at port 3000");
});

