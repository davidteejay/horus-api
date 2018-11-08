'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResponsesSchema extends Schema {
  up () {
    this.create('responsesHorus', (table) => {
      table.increments()
      table.integer('projectId').notNullable()
      table.integer('talentId').notNullable()
      table.enu('status', ['involved', 'uninvolved']).defaultTo('uninvolved')
      table.boolean('approved').defaultTo(false)
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('responses')
  }
}

module.exports = ResponsesSchema
