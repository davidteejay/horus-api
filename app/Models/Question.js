'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
		static get table(){
		return "questions"
	}

	answers(){
		return this.hasOne('App/Models/Answer')
	}

	test(){
		return this.belongsTo('App/Models/Test')
	}
}

module.exports = Question
