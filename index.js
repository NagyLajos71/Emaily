const express=require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');//gives access to cokies
const passport=require('passport');//here we will make use of cookies
//the order of require statement can result in error
//this is the correct order 
require('./models/user');
require('./services/passport');
const keys=require('./config/keys')
mongoose.connect(keys.mongoURI)

const app=express();

//MIDDLEWARES
app.use(
    cookieSession(
        {maxAge: 30*24*60*60*1000,
        keys:[keys.cookieKey]//encryption key for cookie
        }//how long cookie can exist before expire in millisec 30 days
    )
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//this is valid JavaScript
//instead of importing and using the variable once
//we can write the code like this 

const PORT=process.env.PORT || 5000; 
app.listen(PORT);