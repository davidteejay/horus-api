'use strict'

const Test = use('App/Models/Test')
const Question = use('App/Models/Question')
const Result = use('App/Models/Result')

class LoadController {
	async createTest({request, response}){
		try{

			const params = await request.all()

			const createTest = await Test.create(params)

			if (createTest) {
				return response.status(200).json({
					data: params,
					message: 'Test successfully created',
					error: false,
				})
			} else{
				return response.status(403).json({
					data: [],
					message: 'Unable to create Test',
					error: true,
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

	async getAllTest({request, response}){
		try{

			const tests = await Test.query().where({isDeleted:false}).orderBy('id','desc').get()

			if(tests){

			return response.status(200).json({
				data: tests,
				message: 'Tests successfully retrieved',
				error: false
			})
		}else{
			return response.status(403).json({
				data: [],
				message: 'Tests could not be retrieved',
				error:true
			})
		}

		} catch(e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async getTest ({params, response}){

		try{

			const id = await params.id

			const test = await Test.findOrFail(id)
			if (test) {
				return response.status(200).json({
				data: test,
				message: 'Test received successfully',
				error:false
			})
			}else{
				return response.status(403).json({
				data: [],
				message: 'Test could not be retrieved',
				error:true
			})
			}
	
		} catch (e){
			return response.status(500).json({
				message: e.message,
				error:true
			})
		}
	}

	async updateTest({request,  response}){

		try{

			const { id } = request
			
			const parame = await request.except('id')

			const update = await Test.query().where({id}).update({...parame})
			//const update = await Test.create({...parame})

			if (update) {
				return response.status(200).json({
					data: update,
					error:false,
					message:'Test updated successfully'
				})
			}else{
				return response.status(403).json({
				data:[],
				message: 'Test could not be updated',
				error:true
			})
			}

		} catch (e){
				return response.status(500).json({
					data:[],

					error:true,
					message:e.message
				})
		}
	}

		async deleteTest({request, params, response}){

		try{

			const id = params.id
			
			
			const deleted = await Test.query().where({id}).update({isDeleted:true})

			if (deleted) {
				return response.status(200).json({
					data: deleted,
					error:false,
					message:'Test deleted successfully'
				})
			}else{
				return response.status(403).json({
				data: test,
				message: 'Test could not be deleted',
				error:true
			})
			}

		} catch (e){
				return response.status(500).json({
					data: [],
					error:true,
					message:e.message
				})

		}
	}

		async createQuestion({request, response}){
		try{

			const params = await request.all()

			const createQuestion = await Question.create(params)

			if (createQuestion) {
				return response.status(200).json({
					data: createQuestion,
					message: 'Test successfully created',
					error: false,
				})
			} else{
				return response.status(403).json({
				data: test,
				message: 'Test could not be created',
				error:true
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

	async getAllQuestion({request, response}){
		try{

			const tests = await Question.query().where({isDeleted:false}).orderBy('id','desc').get()

			if(tests){

			return response.status(200).json({
				data: tests,
				message: 'Question successfully retrieved',
				error: false
			})
		}

		} catch(e) {
			return response.status(500).json({
				data: [],
				message: e.message,
				error: true
			})
		}
	}

	async getQuestion ({params, response}){

		try{

			const id = await params.id

			const test = await Question.findOrFail(id)
			if (test) {

			return response.status(200).json({
				data: test,
				message: 'Question received successfully',
				error:false
			})
			}else{

				return response.status(403).json({
				data: test,
				message: 'Question could not be retrieved at this time',
				error:true
			})

			}

		} catch (e){
			return response.status(500).json({
				message: e.message,
				error:true
			})
		}
	}

	async updateQuestion({request, params, response}){

		try{

			const { id } = request.all()
			
			const parame = await request.except('id')

			const update = await Question.query().where({id}).update({...parame})

			if (update) {
				return response.status(200).json({
					data: update,
					error:false,
					message:'Test updated successfully'
				})
			}else{
				return response.status(403).json({
				data: result,
				message: 'Test could not be updated at this time',
				error:true
			})
			}

		} catch (e){
				return response.status(500).json({
					data: [],
					error:true,
					message:e.message
				})

		}
	}

		async deleteQuestion({request,  response, params}){

		try{

			//const id  = await request.all()
			const id  = params.id
			
			const deleted = await Question.query().where({id}).update({isDeleted:true})

			if (deleted) {
				return response.status(200).json({
					data: deleted,
					error:false,
					message:'Question deleted successfully'
				})
			}else{
				return response.status(403).json({
				data: result,
				message: 'Question could not be deleted at this time',
				error:true
			})
			}

		} catch (e){
				return response.status(500).json({
					data: id,
					error:true,
					message:e.message
				})

		}
	}

	async getResult({params, response}){
		try{

			const user_id = await params.id

			//const result = await Result.findOrFail(id)
			const result = await Result.query().where({user_id: user_id}).first()
			if (result) {
				return response.status(200).json({
				data: result,
				message: 'Result received successfully',
				error:false
			})
			}else{
				return response.status(403).json({
				data: result,
				message: 'Result could not be retrieved at this time',
				error:true
			})
			}
			
		} catch(e){
			return response.status(500).json({
				message: e.message,
				error: true
			})
		}
	}

	async addResult({request, response}){

		try{

			const params = await request.all()
			const result = await Result.create({...params})

			if (result) {
				return response.status(200).json({
				data: result,
				message: 'Users result addeD successfully',
				error:false
			})
			}else{
				return response.status(403).json({
				data: test,
				message: 'Result could not be added at this time',
				error:true
			})
			}

		} catch(e){
			return response.status(500).json({
				data: [],
				message: e.message,
				error:true
			})
		}
	}
}

module.exports = LoadController
