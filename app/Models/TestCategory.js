'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TestCategory extends Model {
		static get table(){
		return "testCategriesHorus"
	}

	tests(){
		return this.hasMany('App/Models/Test')
	}
}

module.exports = TestCategory
