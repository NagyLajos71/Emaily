//mongoose model class
const mongoose=require('mongoose');
const {Schema}= mongoose;
const userSchema=new Schema({
    googleId: String
});

const collectionName='users';
mongoose.model(collectionName, userSchema);//create a new collection called users