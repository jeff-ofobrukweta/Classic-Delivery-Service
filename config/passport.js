const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcryptjs = require('bcryptjs');


// serialize the user 
passport.serializeUser(function(user,cb){
    cb(null,user.id);
});

// Deserialize the user 
passport.deserializeUser(function(id,cb){
    User.findOne({id}).exec(function(err,user){
        cb(err,user);
    });
});

// Local

passport.use(new LocalStrategy({
      UserpasswordField:'password',
      UseremailField:'email'
},function(username,password){
    User.findOne({email:email}).exec(function(err,user){
        if(err) return cb(err);
        if(!user) return(null,false,{message:'no user found in the record'});
        bcrypt.compare(password,user.password,function(err,res){
            if(!res) return cb(null,false,{message:'Invalid Password'});
            return cb(null,user,{message:'Login Sucessful'});
        })
    });
}));