/**
 * Ambassador.js
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
    BuisnessName: {
      type: 'string',
      required: false,
      unique:false
    },
    BuisnessCategory: {
      type: 'string',
      required: false,
      unique:false
    },
    BuisnessDescription: {
      type: 'string',
      required: false,
      unique:false
    },
    ConactUrl: {
      type: 'string',
      required: false,
      unique:false
    },
    BuisnessEmail:{
      type: 'string',
      required: false,
      unique:false
    },
    BuisnessPhonenumber: {
      type: 'string',
      required: false,
      unique:false
    },
    BuisnessAddress: {
      type: 'string',
      required: false,
      unique:false
    },
    countView: {
      type: 'number',
      required: false,
      unique:false
    },
    pictureUrl1:{
      type: 'string',
      required: false,
      unique:false
    },
    pictureUrl2:{
      type: 'string',
      required: false,
      unique:false
    },

    PictureModel: {
      collection: 'Pictures',
      via: 'ProfileUrl'
    },

    owner: {
      model: 'User'
    }
    
  },
};



