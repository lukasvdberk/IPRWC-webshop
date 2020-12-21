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
}
