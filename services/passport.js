const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('../config/keys'); //after refactoring the path was changed
const mongoose=require('mongoose');


const User=mongoose.model('users');

//function to create cookie for DB>user
passport.serializeUser((user, done)=>{
  done(null, user.id);//user.id=mongo's own id
});
//receiving cookie from user
passport.deserializeUser((id,done)=>{
  User.findById(id)
  .then(user=>{
    done(null,user);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      (accessToken,refreshToken, profile, done) => {
        //attempt to find 1 record inside the users collection
        User.findOne({googleId:profile.id})
        .then((existingUser)=>{
          if(existingUser){
            //we already have a record with the given profile id
            done(null,existingUser);//no error, we are happy
          }
          else {
            //we dont have the user id in the DB
            //make a new record
            new User({googleId:profile.id})
            .save()//creates an instance of a user and save it to DB
            .then(user=>done(null, user));
          }
        })
        
      }
    )
  );
