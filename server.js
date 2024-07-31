const express = require('express');
const app = express();
const db =require('./db');
require('dotenv').config();

//connecting the middleware for parsing the data
const bodyParser =require('body-parser');
const PORT = process.env.PORT ||3000;
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Hello World ')
})




// //POST route to add aperson
// app.post('/person',async(req,res)=>{
// try{
//   const data =req.body  //Assuming the request body contains the person data

//   //creating a new Person document using the Mongoose Model
//   const newPerson = new Person(data);

//   //Save the new person  to the database
//  const response = await newPerson.save();
//  console.log('data saved');
//  res.status(200).json(response)


// }
// catch(err){
//   console.log(err);
//   res.status(500).json({error:'Internal Server Error'})
// }
// })



//Import Person routes
const personRoutes =require('./routes/personRoutes');
const menuItemRoutes =require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes)









app.get('/raj',(req,res)=>{
    res.send('hi raj')
})
app.listen(PORT) 