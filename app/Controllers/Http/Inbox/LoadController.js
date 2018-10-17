'use strict'

const Thread = use('App/Models/Thread')
const Message = use('App/Models/Message')

class LoadController {
	async getThreads({ request, response }){
		try {
			const { userId } = request.all()
			let threads = await Thread.query().where({ senderId: userId, isDeleted: false }).orWhere({ receiverId: userId, isDeleted: false }).get()

			if (threads){
				for (let thread of threads){
					const messages = await Message.query().where({ threadId: thread.id, isDeleted: false }).get()
					thread.messages = messages;
				}

				return response.status(200).json({
					data: threads,
					message: 'Threads received successfully',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Threads could not be retrieved',
					error: true
				})
			}
		} catch (e){
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async sendMessage({ request, response }){
		try {
			const params =  request.all()

			if(!params.threadId){

			}
			
			const sendMessage = Message.create(params)

			if (sendMessage){
				return response.status(200).json({
					data: sendMessage,
					message: 'Message sent',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Message could\'nt be sent',
					error: true
				})
			}
		} catch (e){
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}
}

module.exports = LoadController
