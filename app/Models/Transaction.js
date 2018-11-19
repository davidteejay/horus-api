'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
	static get table(){
		return "transactionsHorus"
	}

	static boot() {
		super.boot()

		this.addHook('beforeCreate', async (instance) => {
			instance.slug = Math.random().toString(36).substring(2, 10).toUpperCase()
		})
	}
}

module.exports = Transaction
