const CustomerDAO = require('../dao/customerDAO')
const OrderDAO = require('../dao/orderDAO')
const ProductDAO = require('../dao/productDAO')

const Order = require('../models/order')
const ProductOrder = require('../models/productOrder')

const ApiResponse = require('./utils/apiResponse')

module.exports = class OrderController {
    static async getAllOrders(req, res, next) {

    }

    static canAccessOrders(req) {
        // Can only access orders if the user id is the same as in the JWT token or the user is admin
        const userId = req.params.userId
        const userIdOfJWT = req.user.id

        return req.user.isAdmin || userId == userIdOfJWT
    }

    static async getOrdersFromCustomer(req, res, next) {
        try {
            if(!OrderController.canAccessOrders(req)) {
                return ApiResponse.errorResponse(401, 'Not authorized', res)
            }
            const userId = req.params.userId

            const customer = await CustomerDAO.getCustomerByUserId(userId)

            if (customer === undefined) {
                return ApiResponse.errorResponse(404, 'Customer not found', res)
            }
            const ordersFromUser = await OrderDAO.getAllOrdersFromCustomer(customer)

            return ApiResponse.successResponse(ordersFromUser, res)
        } catch(ignored) {
            console.log(ignored)
            return ApiResponse.errorResponse(500, 'Failed to fetch orders', res)
        }
    }

    static async placeOrder(req, res, next) {
        const customer = await CustomerDAO.getCustomerByUserId(req.user.id)
        const productOrders = req.body

        if(!OrderController.canAccessOrders(req)) {
            return ApiResponse.errorResponse(401, 'Not authorized', res)
        }

        let productOrdersModels = []
        for(let i = 0; i < productOrders.length; i++) {
            const productOrder = productOrders[i]

            const product = await ProductDAO.getProductById(productOrder.productId)

            if(product === undefined) {
                return ApiResponse.errorResponse(
                    404, `Product with id ${productOrder.productId} could not be found`, res
                )
            }

            productOrdersModels.push(new ProductOrder(
                product,
                productOrder.amount,
                productOrder.size
            ))
        }
        let order = new Order(customer, productOrdersModels)
        try {
            await OrderDAO.saveOrder(order)
            return ApiResponse.successResponse({
                saved: true
            }, res)
        } catch (ignored) {
            return ApiResponse.errorResponse(404, 'One or more products could not be found', res)
        }
    }
}
