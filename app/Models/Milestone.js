'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Milestone extends Model {
	static get table(){
		return "milestonesHorus"
	}

	static boot() {
		super.boot()

		this.addHook('beforeCreate', async (instance) => {
			instance.slug = Math.random().toString(36).substring(2, 10).toUpperCase()
		})
	}

	project(){
		return this.belongsTo('App/Models/Project')
	}

	tasks(){
		return this.hasMany('App/Models/Task')
	}
}

module.exports = Milestone
