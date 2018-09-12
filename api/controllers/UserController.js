/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwToken = require('../../config/jwToken.js');

module.exports = {
All(req, res){
        const body = req.body;
        User.find(body).then((users)=> {
        return res.json(users);
        })
},
signup(req, res) {
        const body = req.body;
        User.create(body).fetch().exec((err,user)=>{
            if(err) return res.negotiate(err)
            res.json({user});
        })
},
    singleUser(req,res){
        const id = req.params.id;
        User.findOne(id).then((foundUser) => {
            if (!foundUser) {
              return res.notFound('Could not find user having same id credentials, sorry.')
            }
            return res.json(foundUser);
          }).catch((err)=>{
            res.badRequest(err);
          });
    },
    findonethroughEmail(req, res) {
        var firstname = req.body.firstname;
        var email = req.body.email;
        User.findOne({
            or: [
                { firstname: firstname },
                { email: email }
            ]
        }).exec(function (err, user) {
            console.log(user);
            res.json(user)
            if (err) {
                return res.json({ err });
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return res.json({ err });
            }
        });
    },
    destroyUser(req, res){
        const id = req.params.id;
        const username = req.body.username;
        User.destroy(id).then(function (err){
            if (err) {
              return res.negotiate(err);
            }
            sails.log(`The user(s) named ${username} have now been deleted, if there were any.`);
            return res.ok();
          });
    },
    updateUser(req,res){
        const id = req.params.id;
        const password = req.body.password;
        User.update({id:id},
        {
            password:password
        }
        ).then((updated)=>{
          res.json(updated[0])
        }).catch((err)=>{
            res.badRequest(err);
            console.log(`sorry the user cannot be updated due to the errors encountered`)
        });
       
    },
    updateUserwithname(req, res) {
        const id = req.params.id;
        const firstname = req.body.firstname;
        const secondname = req.body.secondname;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const password = req.body.password;
        User.update({ email: email },
            {
                password: password
            }
        ).then((updated) => {
            console.log(`This is the new password ::::::${password}`)
            res.json(updated[0])
        }).catch((err) => {
            res.badRequest(err);
            console.log(`sorry the user cannot be updated due to the errors encountered`)
        });

    },
    jwtcreate(req,res){
        const body = req.body;
        if (req.body.password !== req.body.confirmPassword) {
          return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
        }
        const data =  {
            user: req.body, 
            token: jwToken.issue({id: body.id,email:body.email,firstname:body.firstname})
        }
        console.log('hello dear vivian');
        console.log(200,data);

        // User.create(data).then((user) => {
        //     if (user) {
        //         console.log(user);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        //     // res.badRequest(err.invalidAttributes);
        // });
      }
};


