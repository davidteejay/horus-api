'use strict'

const Model = use('Model')

class Lead extends Model {
    static get table() {
        return 'premium_client_requests'
    }

    static get hidden() {
        return ['company']
    }
}

module.exports = Lead
