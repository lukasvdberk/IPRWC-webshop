const CustomerDAO = require('../dao/customerDAO')
const OrderDAO = require('../dao/orderDAO')
const ProductDAO = require('../dao/productDAO')

const Order = require('../models/order')
const ProductOrder = require('../models/productOrder')

const ApiResponse = require('./utils/apiResponse')

module.exports = class OrderController {
    static async getAllOrders(req, res, next) {

    }

    static async getOrdersFromUser(req, res, next) {

    }

    static async placeOrder(req, res, next) {
        // TODO check if valid product ids
        // TODO add try catch on code below
        const customer = await CustomerDAO.getCustomerByUserId(req.user.id)
        const productOrders = req.body.productOrders

        let productOrdersModels = []
        for(let i = 0; i < productOrders.length; i++) {
            const productOrder = productOrders[i]

            const product = await ProductDAO.getProductById(productOrder.productId)

            if(product === undefined) {
                return ApiResponse.errorResponse(404, 'One or more products could not be found', res)
            }

            productOrdersModels.push(new ProductOrder(
                product,
                productOrder.amount
            ))
        }
        let order = new Order(customer, productOrdersModels)
        try {
            await OrderDAO.saveOrder(order)
            return ApiResponse.successResponse({
                saved: true
            }, res)
        } catch (ignored) {
            console.log(ignored)
            return ApiResponse.errorResponse(404, 'One or more products could not be found', res)
        }
    }
}
