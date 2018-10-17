'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
	static get table(){
		return "projectsHorus"
	}
	
	milestones(){
		return this.hasMany('App/Models/Milestone')
	}
}

module.exports = Project
