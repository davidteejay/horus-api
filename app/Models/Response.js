'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Response extends Model {
	static get table() {
		return "responsesHorus"
	}
}

module.exports = Response
