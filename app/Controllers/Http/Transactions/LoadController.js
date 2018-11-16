'use strict'

const Transactions = use('App/Models/Transaction')
const User = use('App/Models/User')

class LoadController {
	async fetchAll({ request, response }){
		try {
			const transactions = await Transactions.query().where({ isDeleted: false }).orderBy('id', 'desc').get()

			if (transactions){
				for (let transaction of transactions){
					const user = await User.query().where({ id: transaction.clientId }).first()

					transaction.client = user
				}

				return response.json({
					data: transactions,
					message: 'Transactions fetched successfully',
					error: false
				})
			} else {
				return response.json({
					data: [],
					message: 'Couldn\'t fetch Transactions',
					error: true
				})
			}
		} catch(e){
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async fetchOne({ request, response }){
		try {
			const transactions = await Transactions.query().where({ ...request.all() }).first()

			if (transactions) {
				const user = await User.query().where({ id: transactions.clientId }).first()
				transactions.client = user

				return response.json({
					data: transactions,
					message: 'Transaction fetched successfully',
					error: false
				})
			} else {
				return response.json({
					data: [],
					message: 'Couldn\'t fetch Transaction',
					error: true
				})
			}
		} catch(e){
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async create({ request, response }){
		try {
			const params = request.all()

			const add = await Transactions.create(params)

			if (add) {
				return response.json({
					data: add,
					message: 'Transaction Added',
					error: false
				})
			} else {
				return response.json({
					data: [],
					message: 'Transaction couldn\'t be added',
					error: true
				})
			}
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
