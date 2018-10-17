'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messagesHorus', (table) => {
      table.increments()
      table.integer('projectId').notNullable()
      table.integer('threadId').notNullable()
      table.integer('senderId').notNullable()
      table.string('message').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
