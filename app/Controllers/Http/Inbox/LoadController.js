'use strict'

const Thread = use('App/Models/Thread')
const Message = use('App/Models/Message')
const User = use('App/Models/User')

class LoadController {
	async getThreads({ request, response }){
		try {
			const { userId } = request.all()
			let threads = await Thread.query().where({ senderId: userId, isDeleted: false }).orWhere({ receiverId: userId, isDeleted: false }).get()

			if (threads){
				for (let thread of threads){
					const messages = await Message.query().where({ threadId: thread.id, isDeleted: false }).get()
					thread.messages = messages;
								
					const sender = await User.query().where({ id: thread.senderId, isDeleted: false }).first()
					thread.sender = sender;
				
					const receiver = await User.query().where({ id: thread.receiverId, isDeleted: false }).first()
					thread.receiver = receiver;
				}


				return response.json({
					data: threads,
					message: 'Threads received successfully',
					error: false
				})
			} else {
				return response.json({
					data: [],
					message: 'Threads could not be retrieved',
					error: true
				})
			}
		} catch (e){
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async sendMessage({ request, response }){
		try {
			const params =  await request.all()

			if(!params.threadId){
				const { projectId, senderId, receiverId, message } = params;
				const newThread = {
					projectId, senderId, receiverId
				}

				const created = await Thread.create(newThread)

				if (created) {
					const threadId = created.id

					const messageObject = {
						projectId, senderId, message, threadId
					}

					const sent = await Message.create(messageObject)

					if (sent){
						return response.json({
							data: sent,
							message: 'Thread created and message sent',
							error: false
						})
					} else {
						return response.json({
							data: [],
							message: 'Message couldn\'t be sent',
							error: true
						})
					}
				} else {
					return response.json({
						data: [],
						message: 'Thread couldn\'t be sent',
						error: true
					})
				}
			} else {
				const sent = await Message.create(params)

				if (sent) {
					return response.json({
						data: sent,
						message: 'Message sent',
						error: false
					})
				} else {
					return response.json({
						data: [],
						message: 'Message couldn\'t be sent',
						error: true
					})
				}
			}
		} catch (e){
			return response.json({
				data: [],
				message: e.message,
				error: true
			})
		}


		}
	}


module.exports = LoadController
