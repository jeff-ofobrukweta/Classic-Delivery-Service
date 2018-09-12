/**
 * AuthcontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');

module.exports = {
    login:(req, res)=>{
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                //this part displays all the users in the storage
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                console.log({message:info.message});
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

// Logout function

logout:function(req,res){
    // req.logout();
    // res.json('logged out sucessful');
},

// Register function
register:async function(req,res){
    console.log(req.body.email);
     data ={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    }

   await User.create(data).fetch().exec((err,user)=>{
        if(err) return res.negotiate(err)
        req.login(user,(err)=>{
            if(err) return res.negotiate(err);
            res.json('User'+" "+user.id+" "+'has logged in');
        })
    })
},

Ambassedorsignup(req, res) {
    const data = req.query;

    const responseString = data;
    console.log(responseString);
    const MESSAGE = responseString.MESSAGE;
    const MESSAGEID = responseString.SHORTCODE;
    const SENDER = responseString.SENDER;
    const OPERATOR = responseString.OPERATOR;
    const SHORTCODE = responseString.SHORTCODE;
    

    Ambassador.create(responseString).fetch().exec((err,user)=>{
            if(err) return res.json({decription:'error please check parameter passed in',status:400}) 

            res.json({OK:'#OK',statuscode:200});
    })
},
Allmessages(req, res){
    const body = req.body;
    Ambassador.find(body).then((users)=> {
    return res.json(users);
    })
},

};

