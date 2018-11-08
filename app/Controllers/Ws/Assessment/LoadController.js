'use strict'

class LoadController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = LoadController
