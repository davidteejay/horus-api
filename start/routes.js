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

Route.route('/', () => {
  return 'Peekaboo'
}, ['GET', 'POST'])

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('signup', 'AuthController.signup')
}).prefix('auth')

Route.group(() => {
  Route.get('/', () => 'Project')
}).prefix('projects').namespace('Project')

Route.group(() => {
  Route.get('fetchAll', 'LoadController.fetchAll')

  Route.post('create', 'LoadController.createLead').validator('createLead')
}).prefix('leads').namespace('Lead').middleware(['checkAuth'])

Route.group(() => {
  Route.get('fetchAll', 'LoadController.fetchAll')

  Route.post('create', 'LoadController.createProject').validator('createProject')
}).prefix('projects').namespace('Project').middleware(['checkAuth'])

Route.route('*', () => {
  return 'Incorrect Route'
}, ['GET', 'POST'])