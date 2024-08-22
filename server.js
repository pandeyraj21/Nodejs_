const express = require('express');
const app = express();
const db =require('./db');
require('dotenv').config();
const passport =require('./auth')


//connecting the middleware for parsing the data
const bodyParser =require('body-parser');
const PORT = process.env.PORT ||3000;
app.use(bodyParser.json());

//Middleware Function for Logger
const logRequest =(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); //Move on to the next phase(It will show the work of middleware is completed)
}

app.use(logRequest)





//intilizing for use
app.use(passport.initialize());

//intializing middleware for passing it in to routes.
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware ,function (req, res) {
  res.send('Hello World ')
})

//Import Person routes
const personRoutes =require('./routes/personRoutes');
const menuItemRoutes =require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware,menuItemRoutes)

app.get('/raj',(req,res)=>{
    res.send('hi raj')
})
app.listen(PORT) 