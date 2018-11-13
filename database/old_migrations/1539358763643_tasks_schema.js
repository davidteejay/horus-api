'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasksHorus', (table) => {
      table.increments()
      table.integer('milestoneId').notNullable()
      table.integer('projectId').notNullable()
      table.string('title').notNullable()
      table.boolean('completed').defaultTo(false)
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
