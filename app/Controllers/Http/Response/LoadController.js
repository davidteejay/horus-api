'use strict'

const Response = use('App/Models/Response')
class LoadController {
	async addResponse({ request, response }) {
		try {
			const params = request.all()

			const addResponse = await Response.create(params)

			if (addResponse) {
				return response.status(200).json({
					data: addResponse,
					message: 'Response Added',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Response couldn\'t be added',
					error: true
				})
			}
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async getAll({ request, response }){
		try {
			const responses = await Response.query().where({ isDeleted: false }).get()

			if (responses){
				return response.status(200).json({
					data: responses,
					message: 'Responses successfully retrieved',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Could not fetch responses',
					error: true
				})
			}
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async updateResponse({ request, response }) {
		try {
			const { id } = request.all();
			const params = request.except('id');
			const updateTask = await Response.query().where({ id }).update({ ...params })

			if (updateTask) {
				return response.status(200).json({
					data: [],
					message: 'Response Updated',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Response couldn\'t ne updated',
					error: true
				})
			}
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: false
			})
		}
	}
}

module.exports = LoadController
