const Database = require('./database')

const ProductDAO = require('./productDAO')
const CustomerDAO = require('./customerDAO')

const Order = require('../models/order')
const ProductOrder = require('../models/productOrder')
const Product = require('../models/product')


module.exports = class OrderDAO {
    static async orderQueryResultToModels(ordersFromUserQueryResult) {
        let orderModels = []
        if (ordersFromUserQueryResult.rowCount > 0) {
            for (let i = 0; i < ordersFromUserQueryResult.rows.length; i++) {
                const orderQueryResult = ordersFromUserQueryResult.rows[i]

                const productOrdersQueryResult = await Database.executeSQLStatement(
                    `
                    SELECT *
                    FROM order_rule
                    JOIN product p on order_rule.product_id = p.product_id
                    WHERE order_id=$1
                    `,
                    orderQueryResult.order_id
                )
                const productOrders = []
                if(productOrdersQueryResult.rowCount > 0) {
                    const products = ProductDAO.queryResultToModel(productOrdersQueryResult)

                    for (let j = 0; j < products.length; j++) {
                        productOrders.push(new ProductOrder(
                            products[j],
                            productOrdersQueryResult.rows[j].amount,
                            productOrdersQueryResult.rows[j].size,
                        ))
                    }
                }
                const customerOfOrder = await CustomerDAO.getCustomerByCustomerId(orderQueryResult.customer_id)
                let order = new Order(customerOfOrder, productOrders)
                order.id = orderQueryResult.order_id
                order.orderedOn = orderQueryResult.ordered_on
                order.status = orderQueryResult.status
                orderModels.push(order)
            }
        }
        return orderModels
    }

    static async getOrderById(orderId) {
        try {
            const ordersFromUserQueryResult = await Database.executeSQLStatement(
                'SELECT * FROM "order" WHERE order_id = $1',
                orderId
            )

            return (await OrderDAO.orderQueryResultToModels(ordersFromUserQueryResult))[0]
        } catch (ignored) {
            return undefined
        }
    }

    static async getAllOrders() {
        try {
            const ordersFromUserQueryResult = await Database.executeSQLStatement(
                'SELECT * FROM "order"',
            )

            return await OrderDAO.orderQueryResultToModels(ordersFromUserQueryResult)
        } catch (ignored) {
            return undefined
        }
    }

    static async getAllOrdersFromCustomer(customer) {
        try {
            const ordersFromUserQueryResult = await Database.executeSQLStatement(
                'SELECT * FROM "order" WHERE customer_id=$1',
                customer.id
            )

            return await OrderDAO.orderQueryResultToModels(ordersFromUserQueryResult)
        } catch (ignored) {
            return undefined
        }
    }

    static async updateStatusOfOrder(orderId, status) {
        try {
            const updatedQueryOrderResult = await Database.executeSQLStatement(
                `UPDATE "order"
                SET status = $1
            WHERE order_id = $2`,
                status, orderId
            )

            return updatedQueryOrderResult.rowCount > 0
        } catch (ignored) {
            return false
        }
    }

    static async saveOrder(order) {
        const newOrderQueryResult = await Database.executeSQLStatement(
            `INSERT INTO "order" (customer_id, ordered_on, status)
            VALUES ($1::integer, CURRENT_TIMESTAMP, 'PROCESSING') RETURNING order_id`,
            order.customer.id
        )

        const sqlQueries = []

        for(let i = 0; i < order.productOrders.length; i++) {
            const productOrder = order.productOrders[i]
            const productId = productOrder.product.id || 0
            const amount = productOrder.amount || 0
            const size = productOrder.size || 0

            sqlQueries.push({
                sqlStatement:
                    'INSERT INTO order_rule (order_id, product_id, amount, size)' +
                    ' VALUES ($1, $2, $3, $4)',
                args: [newOrderQueryResult.rows[0].order_id, productId, amount, size]
            })
        }
        const savedProductOrders = await Database.executeSQLStatementsWithTransaction(sqlQueries)

        if(!savedProductOrders) {
            await Database.executeSQLStatement(
                'DELETE FROM order WHERE order_id=$1',
                newOrderQueryResult.rows[0].order_id
            )
        }
        return savedProductOrders
    }
}
