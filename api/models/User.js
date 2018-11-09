/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    phoneNumber: {
      type: 'string',
      required: true,
      minLength: 11,
    },
    email: {
      type: 'string',
      required: true,
      unique:true
    },
    password: {
      type: 'string',
      required: true,
      unique:false
    },
    confirmPassword:{
      type: 'string',
      unique:false
    },

    ProductModel: {
      collection: 'Ambassador',
      via: 'owner'
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password'])
 },
 beforeCreate: function(user, cb){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password, salt, null,(err, hash)=>{
      if(err) return cb(err);
      user.password = hash;
      return cb();
    });
  });
  
},
};

