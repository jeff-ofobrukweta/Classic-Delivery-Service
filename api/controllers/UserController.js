/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
'use strict';
let jwToken = require('../../config/jwToken.js');

module.exports = {
All(req, res){
        const body = req.body;
        User.find(body).populate('ProductModel').then((users)=> {
        return res.json(users);
        })
},

signup(req, res) {
        const body = req.body;
        const data =  {
            user: req.body, 
            token: jwToken.issue({id: body.id,email:body.email})
        }
        User.create(data.user).fetch().exec((err,user)=>{
            if(err) return res.json(err.message);
            res.json({user,token:data.token});
        })
},
    Verify(req,res){
        const token = String(req.params.token)
        if(req.params.token === null){return res.ok(304)}
        return res.json(jwToken.verify(token));
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
        return res.json({message:200,data:data});
      }
};


