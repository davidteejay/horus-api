'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
	static get table(){
		return	"tasksHorus"
	}

	milestone(){
		return this.belongsTo('App/Models/Milestone')
	}
}

module.exports = Task
