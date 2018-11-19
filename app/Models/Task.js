'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
	static get table(){
		return	"tasksHorus"
	}

	static boot() {
		super.boot()

		this.addHook('beforeCreate', async (instance) => {
			instance.slug = Math.random().toString(36).substring(2, 10).toUpperCase()
		})
	}

	milestone(){
		return this.belongsTo('App/Models/Milestone')
	}
}

module.exports = Task
