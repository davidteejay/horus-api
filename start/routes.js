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
}).prefix('auth')

Route.group(() => {
  Route.get('fetchAll', 'LoadController.getAll')
  Route.get('fetchOne', 'LoadController.getOne')
  Route.post('create', 'LoadController.create')

  Route.get('deleteMilestone', 'LoadController.deleteMilestone')
  Route.post('updateMilestone', 'LoadController.updateMilestone')
  Route.get('getMilestone', 'LoadController.getMilestone')
  Route.get('getAllMilestones', 'LoadController.getMilestones')
  Route.post('addMilestone', 'LoadController.addMilestone')

  Route.get('updateTask', 'LoadController.updateTask')
  Route.get('deleteTask', 'LoadController.deleteTask')
}).prefix('projects').namespace('Project').middleware(['checkAuth'])

Route.group(() => {
  Route.post('add', 'LoadController.addResponse')

  Route.get('/', 'LoadController.getAll')
  Route.get('update', 'LoadController.updateResponse')
}).prefix('responses').namespace('Response').middleware(['checkAuth'])

Route.group(() => {
  Route.get('getThreads', 'LoadController.getThreads')

  Route.get('sendMessage', 'LoadController.sendMessage')
}).prefix('inbox').namespace('Inbox').middleware(['checkAuth'])

Route.group(() => {
  Route.get('fetchAll', 'LoadController.fetchAll')

  Route.post('create', 'LoadController.createLead').validator('createLead')
}).prefix('leads').namespace('Lead').middleware(['checkAuth'])

Route.route('*', () => {
  return 'Incorrect Route'
}, ['GET', 'POST'])