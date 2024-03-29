'use strict'

const Database = use('Database')

class LoadController {
	async fetchAll({ response, request }){
		try {
			const milestones = await Database
				.table('milestones')
				.innerJoin('tasks', 'tasks.milestoneId', 'milestones.id')
			
			return response.json({
				data: milestones,
				message: 'Milestones retrieved successfully',
				error: false
			})
		} catch (e){
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async create({ response, request }){
		try {
			const params = await request.except('tasks')
		} catch (e) {
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}
}

module.exports = LoadController
