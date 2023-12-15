const express=require('express');

const app=express();


//route handlers
app.get('/',(req,res)=>{
    res.send({hi:'there'})
});
app.get('/2',(req,res)=>{
    res.send({hi:'there2'})
});
const PORT=process.env.PORT || 5000 //heroku's port or development env port
app.listen(PORT);