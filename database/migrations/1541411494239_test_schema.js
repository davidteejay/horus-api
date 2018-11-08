'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestSchema extends Schema {
  up () {
    this.create('tests', (table) => {
      table.increments()
      table.string('testName').notNullable()
      table.integer('testCategory').notNullable()
      table.string('testDescription')
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
      
    })
  }

  down () {
    this.drop('tests')
  }
}

module.exports = TestSchema

