'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Milestone extends Model {
	static get table(){
		return "milestonesHorus"
	}

	project(){
		return this.belongsTo('App/Models/Project')
	}

	tasks(){
		return this.hasMany('App/Models/Task')
	}
}

module.exports = Milestone
