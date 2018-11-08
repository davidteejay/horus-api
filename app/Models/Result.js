'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Result extends Model {

	user(){
		return this.belongsTo('App/Models/User')
	}

	test(){
		return this.hasOne('App/Models/Test')
	}
}

module.exports = Result
