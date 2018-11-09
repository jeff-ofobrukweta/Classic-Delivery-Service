/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  'GET /logout': {
    controller: 'AuthcontrollerController',
    action: 'logout'
  },
  'POST /login': {
    controller: 'AuthcontrollerController',
    action: 'login'
  },
  'POST /updateProduct/:id':{
    controller:'AuthcontrollerController',
    action:'updateProduct'
  },
  'POST /updateCount/:pd':{
    controller:'AuthcontrollerController',
    action:'updateproductViewCount'
  },
  'GET /All': {
    controller: 'User',
    action: 'All'
  },
  'GET /Allproduct': {
    controller: 'AuthcontrollerController',
    action: 'Allproduct'
  },
  'POST /signup': {
    controller: 'User',
    action: 'signup'
  },
  'POST /create': {
    controller: 'User',
    action: 'create'
  },
  
  'POST /verify/:token': {
    controller: 'User',
    action: 'Verify'
  },
  'POST /findproduct':{
      controller:'User',
      action:'findproduct'
  },
  'POST /search':{
    controller:'AuthcontrollerController',
    action:'search'
},
'POST /addProduct/:id':{
  controller:'AuthcontrollerController',
  action:'addProduct'
},
'POST /destroyUser/:id':{
  controller:'User',
  action:'destroyUser'
},
'DELETE /destroyProduct/:id':{
  controller:'AuthcontrollerController',
  action:'destroyProduct'
}


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
