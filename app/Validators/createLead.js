'use strict'

class createLead {
  get rules () {
    return {
      email: 'required|email',
      fullname: 'required',
      phone: 'required',
      brief: 'required',
      skypeId: 'required',
      links: 'required',
    }
  }
}

module.exports = createLead
