'use strict'

const Lead = use('App/Models/Lead')

class LoadController {
    async fetchAll({request, response}) {
        try {
            const leads = await Lead.query().where({'active': true}).orderBy('id', 'desc').get()

            return response.json({
                data: leads,
                message: 'Leads successfully retrieved',
                error: false,
            })
        } catch(e) {
            return response.json({
                data: [],
                message: e.message,
                error: true
            })
        }
    }

    async fetchOne({ request, response }) {
        try {
            const leads = await Lead.query().where({ ...request.all() }).first()

            return response.json({
                data: leads,
                message: 'Leads successfully retrieved',
                error: false,
            })
        } catch (e) {
            return response.json({
                data: [],
                message: e.message,
                error: true
            })
        }
    }

    async deleteLead({ request, response }) {
        try {
            const deleteMilestone = await Lead.query().where({ ...request.all() }).update({ isDeleted: true })

            if (deleteMilestone) {
                return response.json({
                    data: [],
                    message: 'Lead deleted successfully',
                    eror: false
                })
            } else {
                return response.json({
                    data: [],
                    message: 'Lead couldn\'t be deleted',
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

    async createLead({request, response}) {
        try {
            //get all the request params
            const params = await request.all();
            
            //now store the record in the DB
            const createLead = await Lead.create(params)

            if(createLead) {
                return response.json({
                    data: params,
                    message: 'Leads successfully created',
                    error: false,
                })
            } else {
                return response.json({
                    data: params,
                    message: 'Unable to create lead',
                    error: true,
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
