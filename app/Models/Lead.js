'use strict'

const Model = use('Model')

class Lead extends Model {
    static get table() {
        return 'premium_client_requests'
    }

    static get hidden() {
        return ['company']
    }

    static boot() {
        super.boot()

        this.addHook('beforeCreate', async (instance) => {
            instance.slug = Math.random().toString(36).substring(2, 10).toUpperCase()
        })
    }
}

module.exports = Lead
