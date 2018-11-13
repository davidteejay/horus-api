'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThreadSchema extends Schema {
  up () {
    this.create('threadsHorus', (table) => {
      table.increments()
      table.integer('projectId').notNullable()
      table.integer('senderId').notNullable()
      table.integer('receiverId').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('threads')
  }
}

module.exports = ThreadSchema
