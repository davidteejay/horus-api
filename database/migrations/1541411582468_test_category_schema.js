'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestCategorySchema extends Schema {
  up () {
    this.create('testCategories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('testCategories')
  }
}

module.exports = TestCategorySchema
