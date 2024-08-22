const Person =require('./models/Person');
//Importing Passport-local middleware for useid and password wala authentication
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;

//authentication function using Passport.js
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    //authentication logic here
    try{
      console.log('Received credentials:',USERNAME,password);
      const user =await Person.findOne({username:USERNAME});
      if(!user){
        return done(null,false,{message:'Incorrect username.'});
      }
      console.log('username found')
      const isPasswordMatch = await user.comparePassword(password); //Compare Password is function that we created on person schema for matching the password.
      console.log(isPasswordMatch)
      if(isPasswordMatch){
           return done(null,user);
      }else{
        return done(null,false,{message:'Incorrect password.'});
    
      }
    }catch(err){
      return done(err);
    }
    
    }))


module.exports =passport; //export configured passport