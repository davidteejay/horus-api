'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('testId').notNullable()
      table.string('question').notNullable()
      table.string('optionA').notNullable()
      table.string('optionB').notNullable()
      table.string('optionC').notNullable()
      table.string('optionD').notNullable()
      table.string('answer').notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema


