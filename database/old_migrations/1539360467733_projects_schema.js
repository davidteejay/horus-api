'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projectsHorus', (table) => {
      table.increments()
      table.integer('clientId').notNullable()
      table.integer('leadId').notNullable()
      table.string('title').notNullable()
      table.string('description', 500).notNullable()
      table.double('budget').notNullable()
      table.boolean('active').defaultTo(true)
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
