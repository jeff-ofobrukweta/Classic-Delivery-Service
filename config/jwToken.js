/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */
'use strict';
const jwt = require('jsonwebtoken');
const  tokenSecret = "secretissece%R$%@^TH&65fn64n654655%%%$$$**";

// Generates a token from supplied payload
module.exports.issue = (payload)=> {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn : 180 // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verify = (token, callback)=> {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};
