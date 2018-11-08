'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResultSchema extends Schema {
  up () {
    this.create('results', (table) => {
      table.increments()
      table.integer('test_id').notNullable()
      table.integer('user_id').notNullable()
      table.integer('result').notNullable()
      table.string('grade').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('results')
  }
}

module.exports = ResultSchema
