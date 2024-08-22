const mongoose =require('mongoose');
require('dotenv').config();  

//Define the MongoDB connection URL
const mongoURL ='mongodb://localhost:27017/hotels'
// const mongoURL = process.env.DB_URL ;

//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection
//Mongoose maintains a default  connections object representing the MongoDB connection.
const db =mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export the database connection
module.exports=db;

//sudo systemctl start mongod
//mongosh