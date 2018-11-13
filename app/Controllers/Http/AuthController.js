'use strict'
const User = use('App/Models/User')

class AuthController {
    async login({ request, auth, response }) {
        try {
            const { email, password } = request.all();

            const attemptLogin = await auth.attempt(email, password);

            if (attemptLogin) {
                const user = await User.query().where({ email: email, isDeleted: false }).first()

                //add the user token cred to the user object
                user.type = attemptLogin.type
                user.token = attemptLogin.token
                user.refreshToken = attemptLogin.refreshToken
                //ends...

                return response.status(200).json({
                    data: user,
                    message: 'Login successfully',
                    error: false,
                })
            } else {
                return response.status(422).json({
                    data: [],
                    message: 'Invalid email or password',
                    error: true,
                })
            }
        } catch (e) {
            return response.status(500).json({
                data: [],
                message: e.message,
                error: true,
            })
        }
    }


    async register({request, response}){

        try{

            const params = await request.all()
            //const { email, password } = await request.all()
            const email = await request.all().email
            const password = await request.all().password
            const user = new User

            user.email = email
            user.password = password

            user.save()
            //const register = await User.create(request.only('email', 'password'))

           return response.status(200).json({
            data: params,
            error:false,
            message: 'User data received'

           })
        } catch(e) {
            return response.status(500).json({
                data: [],
                message: e.message,
                error: true,
            })
        }
    }
}

module.exports = AuthController
