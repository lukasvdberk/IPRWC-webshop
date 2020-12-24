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

        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const phoneNumber = req.body.phoneNumber
        const street = req.body.street
        const streetNumber = req.body.streetNumber
        const city = req.body.city
        const country = req.body.country
        const postalCode = req.body.postalCode

        if (!password ||
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !street ||
            !streetNumber ||
            !country ||
            !city ||
            !postalCode) {
            return ApiResponse.errorResponse(404, 'Did not supply all customer information', res)
        }

        AuthorizationUtil.hashPassword(password).then((hashedPassword) => {
            const user = new User(email)

            UserDAO.getUserByEmail(email).then((userObj) => {
                if (userObj === undefined) {
                    UserDAO.saveUser(user, hashedPassword).then((success) => {
                        if (success) {
                            UserDAO.getUserByEmail(email).then((user) => {
                                CustomerDAO.saveCustomer(new Customer(
                                    firstName,
                                    lastName,
                                    phoneNumber,
                                    street,
                                    streetNumber,
                                    postalCode,
                                    city,
                                    country,
                                    user
                                )).then((ignored) => {
                                    return ApiResponse.successResponse({
                                        key: AuthorizationUtil.createJWT(user.id, user.email, false),
                                        isAdmin: false
                                    }, res)
                                })
                            })
                        }
                    })
                } else {
                    return ApiResponse.errorResponse(
                        303, 'User with the given email already exists', res)
                }
            })
        })
    }
}
