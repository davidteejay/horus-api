'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {
    async login({ request, auth, response }) {
        try {
            const { email, password } = request.all();

            const attemptLogin = await auth.attempt(email, password);

            if (attemptLogin) {
                const user = await User.query().where('email', email).first()

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

    async signup({ request, response }) {
        try {
            const validation = await validate(request.all(), {
                username: 'required',
                email: 'required|email',
                password: 'required'
            })

            if (validation.fails()) {
                return response.status(500).json({
                    data: [],
                    message: validation.messages(),
                    error: true,
                })
            }

            const user = new User();
            const { username, email, password } = request.all();
            user.username = username;
            user.email = email,
                user.password = password;

            await user.save()

            return response.status(200).json({
                data: user,
                message: 'Signup successfully',
                error: false,
            })
        } catch (e) {
            return response.status(500).json({
                data: [],
                message: e.message,
                error: true,
            })
        }
    }
}

module.exports = AuthController
