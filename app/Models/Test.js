'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Test extends Model {
	static get table(){
		return "tests"
	}

	answers(){
		return this.hasMany('App/Models/Question')
	}

	testCategory(){
		return this.belongsTo('App/Models/TestCategory')
	}
}

module.exports = Test
