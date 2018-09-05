'use strict'

class CheckToken {
  async handle ({ request, auth, response }, next) {
    //check if the token active and corrent
    const check  = await auth.check();

    if(check) {
      
      // call next to advance the request
      await next()
    } else {
      return response.status(403).json({
        data: [],
        message: "Missing or invalid token provided",
        error: true,
      })
    }
  }
}

module.exports = CheckToken
