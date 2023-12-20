//keys.js
if (process.env.NODE_ENV === 'production'){
    //we are in production, return the prod set of keys
    module.exports =require('./prod')
}
else {
    //we are in developement, return the dev keys
    module.exports = require('./dev')
}


//Heroku enviroment for prod
//test: mongodb+srv://lajosnagybudapest:GyksnaoIfvNzdKtk@cluster0.jjb6ee1.mongodb.net/?retryWrites=true&w=majority