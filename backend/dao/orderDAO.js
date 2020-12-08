const Database = require('./database')

module.exports = class OrderDAO {
    static async saveOrder(order) {
        // TODO make all the sql queries before sending

        const newOrderQueryResult = await Database.executeSQLStatement(
            'INSERT INTO "order" (customer_id, ordered_on) ' +
            'VALUES ($1::integer, CURRENT_TIMESTAMP) returning order_id',
            order.customer.id
        )

        const sqlQueries = []

        for(let i = 0; i < order.productOrders.length; i++) {
            const productOrder = order.productOrders[i]
            const productId = productOrder.product.id || 0
            const amount = productOrder.amount || 0

            sqlQueries.push({
                sqlStatement:
                    'INSERT INTO order_rule (order_id, product_id, amount)' +
                    ' VALUES ($1, $2, $3)',
                args: [newOrderQueryResult.rows[0].order_id, productId, amount]
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
