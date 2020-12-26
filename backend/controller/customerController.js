const Customer = require('../models/customer')

const CustomerDAO = require('../dao/customerDAO')
const ApiResponse = require('./utils/apiResponse')

module.exports = class CustomerController {
    static getCustomer(req, res, next) {
        CustomerDAO.getCustomerByUserId(req.user.id).then((customer) => {
            return ApiResponse.successResponse(customer, res)
        }).catch(() => {
            return ApiResponse.errorResponse(404, 'Customer not found', res)
        })
    }

    static saveCustomer(req, res, next) {
        const user = req.user
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const phoneNumber = req.body.phoneNumber
        const street = req.body.street
        const streetNumber = req.body.streetNumber
        const city = req.body.city
        const country = req.body.country
        const postalCode = req.body.postalCode

        if (
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !street ||
            !streetNumber ||
            !country ||
            !city ||
            !postalCode) {
            return ApiResponse.errorResponse(404, 'Did not supply all customer information', res)
        }


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
            return ApiResponse.successResponse({}, res)
        }).catch((ignored) => {
            return ApiResponse.errorResponse(500,'Failed to save user', res)
        })
    }
}
