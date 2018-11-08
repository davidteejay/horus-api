'use strict'

const Project = use('App/Models/Project')
const Milestone = use('App/Models/Milestone')
const Task = use('App/Models/Task')
const Response = use('App/Models/Response')

class LoadController {
	async getAll({ request, response }){
		try {
			//select projects from the DB
			const projects = await Project.query().where({active: true, isDeleted: false}).orderBy('id', 'desc').get()

			//send success message
			return response.status(200).json({
				data: projects,
				message: 'Projects successfully retrieved',
				error: false,
			})
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async getOne({ request, response }){
		try {
			//get the project
			
			let project = await Project.query().where({ ...request.all(), isDeleted: false }).first()
			
			const { id } = project
			//get the talents for the project
			const talents = await Response.query().where({ projectId: id, isDeleted: false, approved: true, status: 'involved' }).get()

			// get the milestones under the project
			let milestones = await Milestone.query().where({ projectId: id, isDeleted: false }).get()

			//get the tasks under each milestone
			for (let i = 0; i < milestones.length; i++){
				let tasks = await Task.query().where({ projectId: id, isDeleted: false, milestoneId: milestones[i].id }).get()
				milestones[i].tasks = tasks
			}
			
			project.milestones = milestones;
			project.talents = talents			

			return response.status(200).json({
				data: project,
				message: 'Project successfully retrieved',
				error: false
			})
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async create({ request, response }){
		try {
			//get all the request params
			const params = await request.all();

			//now store the record in the DB
			const createLead = await Project.create(params)

			if (createLead) {
				// send success message if saved successfully
				return response.status(200).json({
					data: createLead,
					message: 'Project successfully created',
					error: false,
				})
			} else {
				return response.status(403).json({
					data: params,
					message: 'Unable to create project',
					error: true,
				})
			}
		} catch(e){
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async addMilestone({ request, response }){
		try {
			const params = await request.except('tasks')
			const addMilestone = await Milestone.create(params)

			if (addMilestone) {
				const milestoneId = addMilestone.id;
				const taskList = request.input('tasks');

				let saved = false;
				let tasks = []
				for (let task of taskList){
					let param = { milestoneId, title: task, projectId: params.projectId }
					const addTasks = await Task.create(param)

					if (addTasks){
						saved = true
						tasks.push(addTasks);
					} else saved = false
				}

				if (saved){
					addMilestone.tasks = tasks
					return response.status(200).json({
						data: addMilestone,
						message: 'Milestone created successfully',
						error: false
					})
				} else {
					return response.status(403).json({
						data: [],
						message: 'Unable to create milestone',
						error: true,
					})
				}
			} else {
				return response.status(403).json({
					data: [],
					message: 'Unable to create milestone',
					error: true,
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

	async getMilestone({ request, response }){
		try {
			// get the milestones under the project
			let milestones = await Milestone.query().where({ ...request.all(), isDeleted: false }).first()

			let tasks = await Task.query().where({ projectId: milestones.projectId, isDeleted: false, milestoneId: milestones.id }).get()
			milestones.tasks = tasks

			return response.status(200).json({
				data: milestones,
				message: 'Milestone successfully retrieved',
				error: false
			})
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async getMilestones({ request, response }){
		try {
			// get the milestones under the project
			let milestones = await Milestone.query().where({ ...request.all(), isDeleted: false }).get()

			//get the tasks under each milestone
			for (let i = 0; i < milestones.length; i++) {
				let tasks = await Task.query().where({ projectId: milestones[i].projectId, isDeleted: false, milestoneId: milestones[i].id }).get()
				milestones[i].tasks = tasks
			}

			return response.status(200).json({
				data: milestones,
				message: 'Milestones successfully retrieved',
				error: false
			})
		} catch (e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async deleteMilestone({ request, response }){
		try {
			const deleteMilestone = await Milestone.query().where({ ...request.all() }).update({ isDeleted: true })

			if (deleteMilestone){
				const { id } = request.all()
				const deleteTask = await Task.query().where({ milestoneId: id }).update({ isDeleted: true })

				return response.status(200).json({
					data: [],
					message: 'Milestone deleted successfully',
					eror: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Milestone couldn\'t be deleted',
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

	async updateMilestone({ request, response }){
		try {
			const { id } = request.all();
			const params = request.except('id')
			const updateMilestone = await Milestone.query().where({ id }).update({ ...params })

			if (updateMilestone){
				return response.status(200).json({
					data: updateMilestone,
					message: 'Milestone Updated',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Milestone couldn\'t ne updated',
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

	async updateTask({ request, response }){
		try {
			const { id } = request.all();
			const params = request.except('id');
			const updateTask = await Task.query().where({ id }).update({ ...params })

			if (updateTask){
				return response.status(200).json({
					data: updateTask,
					message: 'Task Updated',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Task couldn\'t be updated',
					error: true
				})
			}
		} catch (e){
			return response.status(500).json({
				data: [],
				message: e.message,
				error: false
			})
		}
	}

	async deleteTask({ request, response }) {
		try {
			const deleteTask = await Task.query().where({ ...request.all() }).update({ isDeleted: true })

			if (deleteTask) {
				return response.status(200).json({
					data: [],
					message: 'Task Deleted',
					error: false
				})
			} else {
				return response.status(403).json({
					data: [],
					message: 'Task couldn\'t be deleted',
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
