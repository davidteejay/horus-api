'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
	static get table(){
		return "transactionsHorus"
	}
}

module.exports = Transaction
