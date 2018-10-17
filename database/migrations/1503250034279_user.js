'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.enu('type', ['project-manager', 'client', 'talent'])
      table.integer('proId')
      table.boolean('isDeleted').defaultTo(false)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
