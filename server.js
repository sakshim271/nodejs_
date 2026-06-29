const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT||3000;

app.get('/', (req, res) => {
  res.send('welcome to hotel NOVA')
})


// import router file
const Routes = require('./routes/menuRoutes');
app.use('/menu',Routes);

// import router file
const personRoutes = require('./routes/personRoutes');
// use router
app.use('/person',personRoutes);


app.listen(3000,() => {
    console.log("listening at port 3000");
})