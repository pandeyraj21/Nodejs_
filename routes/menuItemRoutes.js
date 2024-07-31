const express =require('express');
const router = express.Router();
const MenuItem =require('./../models/MenuItem');

//POST route to add a menu
router.post('/',async(req,res)=>{
    try{
      const data =req.body  //Assuming the request body contains the menu data
    
      //creating a new menu document using the Mongoose Model
      const newMenu = new MenuItem(data);
    
      //Save the new menu  to the database
     const response = await newMenu.save();
     console.log('data saved');
     res.status(200).json(response)
    
    
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
    })
  
  
  //GET method to get the menu 
  router.get('/',async(req,res)=>{
    try{
      const response = await MenuItem.find()
      console.log('data fetched');
      res.status(200).json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
  
    }
  })

module.exports =router;