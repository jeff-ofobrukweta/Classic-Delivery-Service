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
        BuisnessAddress: req.body.BuisnessAddress,
        pictureUrl1:req.body.pictureUrl1,
        pictureUrl1:req.body.pictureUrl1,
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
        res.json({userToken,status:200});
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
        const pictureUrl1 = req.body.pictureUrl1;
        const pictureUrl2 = req.body.pictureUrl2;
        
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
                owner,
                pictureUrl1,
                pictureUrl2
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
singlecard(req,res){
    const idindex = req.params.index;
    Ambassador.findOne(idindex).then((foundCard) => {
        if (!foundCard) {
          return res.notFound('Could not find card having same id credentials, sorry.')
        }
        return res.json(foundCard);
      }).catch((err)=>{
        res.badRequest(err);
      });
},
updateproductViewCount(req, res) {
    const ProductId = req.params.pd;
    let count = req.body.count;
    Ambassador.update({ id: ProductId },
        {
            countView: count
        }
    ).then((updated) => {
        res.ok(200);
    }).catch((err) => {
        res.badRequest(err);
        console.log(`sorry the user cannot be updated due to the errors encountered`)
    });
    
}
};

