'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MilestonesSchema extends Schema {
  up () {
    this.create('milestones', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.integer('projectId').notNullable(),
      table.string('description', 200),
      table.date('startDate').notNullable()
      table.date('endDate').notNullable()
      table.enu('status', ['pending', 'in-progress', 'completed', 'appproved']).defaultTo('pending')
      table.string('feedbackDeadline').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('milestones')
  }
}

module.exports = MilestonesSchema
