const AuthorizationUtil = require('../util/authorizationUtil')
const UserDAO = require('../dao/userDAO')
const CustomerDAO = require('../dao/customerDAO')
const User = require('../models/user')
const Customer = require('../models/customer')
const ApiResponse = require('./utils/apiResponse')

module.exports = class AuthenticationController {
    static login (req, res, next) {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return ApiResponse.errorResponse(400, 'Username or password not supplied', res)
        }

        UserDAO.getUserByEmail(email).then((user) => {
            if (user !== undefined) {
                AuthorizationUtil.validPassword(password, user.hashPassword).then((validPassword) => {
                    if (validPassword) {
                        UserDAO.isUserAdmin(user).then((isUserAdmin) => {
                            const token = AuthorizationUtil.createJWT(user.id, user.email, isUserAdmin)

                            return ApiResponse.successResponse({
                                key: token,
                                isAdmin: isUserAdmin
                            }, res)
                        })
                    } else {
                        return ApiResponse.errorResponse(403, 'Invalid password', res)
                    }
                })
            } else {
                return ApiResponse.errorResponse(404, 'User not found', res)
            }
        })
    }

    static register (req, res, next) {
        const password = req.body.password

        const email = req.body.email

        if (!password || !email) {
            return ApiResponse.errorResponse(404, 'Did not supply email and password', res)
        }

        AuthorizationUtil.hashPassword(password).then((hashedPassword) => {
            const user = new User(email)

            // is used to check if not another use already has this email
            UserDAO.getUserByEmail(email).then((userObj) => {
                if (!userObj) {
                    UserDAO.saveUser(user, hashedPassword).then((success) => {
                        // We need to call this again since then the id will be set
                        UserDAO.getUserByEmail(email).then((user) => {
                            if (success) {
                                return ApiResponse.successResponse({
                                    key: AuthorizationUtil.createJWT(user.id, user.email, false),
                                    isAdmin: false
                                }, res)
                            } else {
                                return ApiResponse.errorResponse(
                                    500, 'Failed to register user', res)
                            }
                        })
                    })
                } else {
                    return ApiResponse.errorResponse(
                        303, 'User with the given email already exists', res)
                }
            })
        })
    }
}
