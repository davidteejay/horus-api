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
  Route.post('register', 'AuthController.register')
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




//Assessment Routes

Route.group(()=>{
  Route.get('tests', 'LoadController.getAllTest')
  Route.post('tests', 'LoadController.createTest')
  Route.put('update_test/:id', 'LoadController.updateTest')
  Route.get('test/:id', 'LoadController.getTest')
  Route.put('delete_test/:id', 'LoadController.deleteTest')

  Route.get('questions', 'LoadController.getAllQuestion')
  Route.post('questions', 'LoadController.createQuestion')
  Route.put('update_question/:id', 'LoadController.updateQuestion')
  Route.get('question/:id', 'LoadController.getQuestion')
  Route.put('delete_question/:id', 'LoadController.deleteQuestion')

  Route.post('addResult', 'LoadController.addResult')
  Route.get('getResult/:id', 'LoadController.getResult')

}).prefix('assessment').namespace('Assessment').middleware(['checkAuth'])


Route.route('*', () => {
  return 'Incorrect Route'
}, ['GET', 'POST'])