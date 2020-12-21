const Database = require('./database')
const Customer = require('../models/customer')
const User = require('../models/user')

module.exports = class CustomerDAO {
    static async saveCustomer(customer) {
        const customerSaveQueryResult = await Database.executeSQLStatement(
            `INSERT INTO public.customer (user_id, customer_id, first_name, last_name, street, 
                street_number, postal_code, customer_since, phone_number) 
             VALUES ($1, DEFAULT, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7)`,
            customer.user.id, customer.firstName, customer.lastName, customer.street,
            customer.streetNumber, customer.postalCode, customer.phoneNumber
        )

        return customerSaveQueryResult.rowCount > 0
    }

    static queryResultToModel(customerQueryResult, userCustomerQueryResult) {
        if (customerQueryResult.rowCount > 0 && userCustomerQueryResult.rowCount > 0) {
            const customerModels = []
            for(let i = 0; i < customerQueryResult.rows.length; i++) {

                const customerFromDatabase = customerQueryResult.rows[i]

                const userFromDatabase = userCustomerQueryResult.rows[i]
                let user = new User(userFromDatabase.email)
                user.isAdmin = userFromDatabase.is_admin
                user.id = userFromDatabase.user_id

                let customer = new Customer(
                    customerFromDatabase.first_name,
                    customerFromDatabase.last_name,
                    customerFromDatabase.phone_number,
                    customerFromDatabase.street,
                    customerFromDatabase.street_number,
                    customerFromDatabase.postal_code,
                    user
                )
                customer.id = customerFromDatabase.customer_id
                customerModels.push(customer)
            }
            return customerModels
        }
        return []
    }

    static async getCustomerByUserId(userId) {
        const customerQueryResult = await Database.executeSQLStatement(
            'SELECT * FROM customer WHERE user_id=$1', userId
        )

        const customerUserQueryResult = await Database.executeSQLStatement(
            `SELECT user_id, "user".email, is_admin
            FROM "user"
            WHERE user_id=$1`,
            userId
        )
        return this.queryResultToModel(customerQueryResult, customerUserQueryResult)[0]
    }
}
