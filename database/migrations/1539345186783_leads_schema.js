'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadsSchema extends Schema {
  up () {
    this.create('leads', (table) => {
      table.increments()
      table.string('email', 80).notNullable().unique(),
      table.string('fullname', 100).notNullable(),
      table.string('phone', 20).notNullable(),
      table.string('brief', 200),
      table.string('skypeId', 20),
      table.string('links', 50)
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadsSchema
