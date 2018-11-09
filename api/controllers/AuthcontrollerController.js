/**
 * AuthcontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
let jwToken = require('../../config/jwToken.js');

module.exports = {
Allproduct:(req, res)=>{
        const body = req.body;
        Ambassador.find(body).populate('PictureModel').then((item)=> {
            return res.json(item);
        })
},
destroyProduct(req, res){
    const id = req.params.id;
    const username = req.body.username;
    Ambassador.destroy(id).then(function (err){
        if (err) {
          return res.negotiate(err);
        }
        return res.ok(200);
      });
},
updateProduct(req,res){
    const id = req.params.id;
    Ambassador.update({id:id},
    {
        BuisnessName : req.body.BuisnessName,
        BuisnessCategory:req.body.BuisnessCategory,
        BuisnessDescription : req.body.BuisnessDescription,
        ConactUrl :req.body.ConactUrl,
        BuisnessEmail: req.body.BuisnessEmail,
        BuisnessPhonenumber :req.body.BuisnessPhonenumber,
        BuisnessAddress: req.body.BuisnessAddress
    }
    ).then(()=>{
        return res.ok(200);
    }).catch((err)=>{
        res.badRequest(err);
        console.log(`sorry the user cannot be updated due to the errors encountered`)
    });
   
},
login: function (req, res, next) {
    passport.authenticate('local', function (err, user, response) {
      if (err) {
        return next(err);
      }
 
      if (user) {
         const userToken =jwToken.issue({user});
         const userToken2 =jwToken.verify(userToken);
        res.json({userToken,status:200,userToken2});
      }
      else {
        res.json({message: 'wrong combination of password and email',status:304});
      }
    })(req, res, next);
  },

    addProduct(req, res) {
        const id = req.params.id;
        const BuisnessName = req.body.BuisnessName;
        const BuisnessCategory = req.body.BuisnessCategory;
        const BuisnessDescription = req.body.BuisnessDescription;
        const ConactUrl = req.body.ConactUrl;
        const BuisnessEmail = req.body.BuisnessEmail;
        const BuisnessPhonenumber = req.body.BuisnessPhonenumber;
        const BuisnessAddress = req.body.BuisnessAddress;
        
        User.findOne(id).then((result) => { 
            const owner = result.id;
            const Productdata =({
                BuisnessName,
                BuisnessCategory,
                BuisnessDescription,
                ConactUrl,
                BuisnessEmail,
                BuisnessPhonenumber,
                BuisnessAddress,
                owner
            })
            const sd = Ambassador.create((Productdata)).fetch();
            return Promise.all([sd,result]);
        }).then((result) => { 
            res.json({result,status:200});
        }).catch((err) => {
            console.log(err);
            res.badRequest(err.invalidAttributes);
        });
    },
// Logout function

logout:function(req,res){
    req.logout();
    res.json('logged out sucessful');
},

search(req, res) {
    const body = req.body;
    Ambassador.find(body).exec( (err, user)=> {
        res.json(user)
        if (err) {
            return res.json({ err });
        } else if (!user) {
            let err = new Error('User not found.');
            err.status = 401;
            return res.json({ err });
        }
    });
},
updateproductViewCount(req, res) {
    const ProductId = req.params.pd;
    Ambassador.find(ProductId).exec( (err, item)=> {
        Ambassador.update({countView:item[0].countView})
        .set({countView:item[0].countView+1}).fetch();
        return res.json(item[0].countView);
        if (err) {
            return res.json({ err });
        } else if (!item) {
            let err = new Error('User not found.');
            err.status = 401;
            return res.json({ err });
        }
    });
}
};

