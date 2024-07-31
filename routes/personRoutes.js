const express =require('express');
const router = express.Router();
const Person =require('./../models/Person');

//add routes of person here 

//POST route to add aperson
router.post('/',async(req,res)=>{
    try{
      const data =req.body  //Assuming the request body contains the person data
    
      //creating a new Person document using the Mongoose Model
      const newPerson = new Person(data);
    
      //Save the new person  to the database
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response)
    
    
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
    })

//get for person
router.get('/',async(req,res)=>{
        try{
          const response = await Person.find()
          console.log('data fetched');
          res.status(200).json(response)
        }catch(err){
          console.log(err);
          res.status(500).json({error:'Internal Server Error'})
      
        }
      })

    
//pairameterized api's
router.get('/:workType',async(req,res)=>{
    try{
      const workType = req.params.workType; //Extract the work type from the URL parameter
      if(workType=='chef' || workType =='manager' || workType =='waiter'){
        const response  =await Person.find({work:workType});
        console.log('data fetched');
        res.status(200).json(response);
      }
      else{
        res.status(400).json({error:'Invalid work type'});
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  })

  //update for person
  router.put('/:id',async(req,res)=>{
try{
    const personId =req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true , //Return the updated document
        runValidators:true, //Run Mongoose Validation
    })

    if(!response){
        return res.status(404).json({error:'Person not found'});
    }

}catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

}
  })


//delete for person

router.delete('/:id',async(req,res)=>{
  try{
    const personId =req.params.id;
    console.log(`Attempting to delete person with ID: ${personId}`);
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found'});
  }
  console.log('data deleted');
  res.status(200).json({message:'person Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }
})

  module.exports =router;