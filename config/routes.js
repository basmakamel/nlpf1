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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'GET /clients' : 'ClientController.client',

  'get /intranet': {
    view: 'pages/intranethomepage',
    locals: {
      layout : 'layouts/layout.ejs'
    }
  },

  'get /login': {
    view: 'pages/login',
    locals: {
      layout : 'layouts/layout.ejs'
    }
  },

  'get /signup': {
    view: 'pages/signup',
    locals: {
      layout : 'layouts/layout.ejs'
    }
  },
  'POST /tickets/answer/:id': {
    controller: 'TicketsController',
    action: 'answer',
    skipAssets: false
  },
  'POST /tickets/accept/:id': {
    controller: 'TicketsController',
    action: 'accept',
    skipAssets: false
  },
  'POST /tickets/deny/:id': {
    controller: 'TicketsController',
    action: 'deny',
    skipAssets: false
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


};
