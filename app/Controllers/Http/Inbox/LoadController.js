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
								
					const sender = await User.query().where({ id: thread.senderId, isDeleted: false }).get()
					thread.sender = sender;
				
					const receiver = await User.query().where({ id: thread.receiverId, isDeleted: false }).get()
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
			let saved = false; 
			let saved_thread = false;
			const newMessage = new Message();

			if(!params.threadId){
			const newThread = new Thread();
			newThread.projectId = params.projectId
			newThread.senderId = params.senderId
			newThread.receiverId = params.receiverId

			await newThread.save()
			//const createThread = await Thread.create(request.only(['projectId', 'senderId', 'receiverId']))

			// if (!createThread) {
			// 	return response.status(403).json({
			// 		data:[],
			// 		message: 'Could not create thread',
			// 		error:true
			// 	})
			// };

			
			newMessage.projectId = params.projectId
			newMessage.senderId = params.senderId
			newMessage.threadId = newThread.id
			newMessage.message = params.message

			await newMessage.save()
			saved = true;
			}else{
	
			await Message.create(request.except('receiverId'))
			saved = true
			}

			if (saved){
				return response.json({
					data: newMessage,
					message: 'Message sent',
					error: false
				})
			} else {
				return response.json({
					data: [],
					message: 'Message could\'nt be sent',
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
	}


module.exports = LoadController
