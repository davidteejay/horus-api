'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
	static get table(){
		return "projectsHorus"
	}

	static boot() {
		super.boot()

		this.addHook('beforeCreate', async (instance) => {
			instance.slug = Math.random().toString(36).substring(2, 10).toUpperCase()
		})
	}
	
	milestones(){
		return this.hasMany('App/Models/Milestone')
	}
}

module.exports = Project
