/**
 * AuthcontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');

module.exports = {
//   Login function
    login:function(req,res){
        passport.authenticate('local',function(err,user,info){
            if(err || !user){
                res.send({message:info.message,
                user
            });
        }
        req.login(user,function(err){
            if(err) res.send(err);
            console.log('User'+" "+user.id+" "+'has logged in');
        })
    })(req,res);

},

// Logout function

logout:function(req,res){
    req.logout();
    sails.log('logged out sucessful');
},

// Register function
register:async function(req,res){
     data ={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        password:req.body.password
    }

    console.log(JSON.stringify(data,null,2))

   await User.create(data).fetch().exec(function(err,user){
        if(err) return res.negotiate(err)
        req.login(user,function(err){
            if(err) return res.negotiate(err);
            console.log('User'+" "+user.id+" "+'has logged in');
        })
    })
}

};

