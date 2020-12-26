const CustomerDAO = require('../dao/customerDAO')
const OrderDAO = require('../dao/orderDAO')
const ProductDAO = require('../dao/productDAO')

const Order = require('../models/order')
const ProductOrder = require('../models/productOrder')

const ApiResponse = require('./utils/apiResponse')

module.exports = class OrderController {
    static async getAllOrders(req, res, next) {
        OrderDAO.getAllOrders().then((orders) => {
            return ApiResponse.successResponse(orders, res)
        }).catch((ignored) => {
            return ApiResponse.errorResponse(500, 'Failed to fetch orders', res)
        })
    }

    static getOrderById(req, res, next) {
        const orderId = req.params.orderId
        OrderDAO.getOrderById(orderId).then((order) => {
            // only the user that made the order can fetch the order or an admin
            if (order.customer.user.id == req.user.id || req.user.isAdmin) {
                return ApiResponse.successResponse(order, res)
            } else {
                return ApiResponse.errorResponse(403, 'Not allowed', res)
            }
        }).catch((ignored) => {
            return ApiResponse.errorResponse(500, 'Failed to fetch order', res)
        })
    }

    static isValidOrderStatus(orderStatus) {
        return orderStatus === 'PROCESSING' ||
            orderStatus === 'DELIVERING' ||
            orderStatus === 'DELIVERED'
    }

    static updateOrderStatus(req, res, next) {
        const orderId = req.params.orderId
        const newOrderStatus = req.body.status

        if(!OrderController.isValidOrderStatus(newOrderStatus)) {
            return ApiResponse.errorResponse(
                400, `Invalid order status. Please use PROCESSING or DELIVERING or DELIVERED`, res
            )
        }
        OrderDAO.updateStatusOfOrder(orderId, newOrderStatus).then((isUpdated) => {
            if (isUpdated) {
                return ApiResponse.successResponse({}, res)
            } else {
                return ApiResponse.errorResponse(500, 'Failed to update status of order', res)
            }
        }).catch((order) => {
            return ApiResponse.errorResponse(500, 'Failed to update status of order', res)
        })
    }

    static canAccessOrders(req) {
        // Can only access orders-from-customer if the user id is the same as in the JWT token or the user is admin
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
            return ApiResponse.errorResponse(500, 'Failed to fetch orders-from-customer', res)
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
