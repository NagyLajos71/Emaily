const passport=require('passport');

module.exports=(app)=>{
//Routes
    app.get('/auth/google', //to authenticate the user who is coming to this route
        passport.authenticate(
            'google',
            {scope:['profile','email']}//asking google to access these user infos
            )
        );

    app.get('/auth/google/callback',
        passport.authenticate('google')
    );
    
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send(req.user);
    });
};

