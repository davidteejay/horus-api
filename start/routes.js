'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('auth')

Route.group(() => {
  Route.get('fetchAll', 'LoadController.fetchAll')

  Route.post('create', 'LoadController.createLead').validator('createLead')
}).prefix('leads').namespace('Lead').middleware(['checkAuth'])

Route.group(() => {
  Route.get('fetchAll', 'LoadController.fetchAll')

  Route.post('create', 'LoadController.createProject').validator('createProject')
}).prefix('projects').namespace('Project').middleware(['checkAuth'])