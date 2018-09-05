'use strict'

const Lead = use('App/Models/Lead')

class LoadController {
    async fetchAll({request, response}) {
        try {
            const leads = await Lead.query().where('active', true).orderBy('id', 'desc').get()

            return response.status(200).json({
                data: leads,
                message: 'Leads successfully retrieved',
                error: false,
            })
        } catch(e) {
            return response.status(500).json({
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
                return response.status(200).json({
                    data: params,
                    message: 'Leads successfully created',
                    error: false,
                })
            } else {
                return response.status(403).json({
                    data: params,
                    message: 'Unable to create lead',
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
}

module.exports = LoadController
