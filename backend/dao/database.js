const { Pool } = require('pg')

module.exports = class Database {

    /**
     * Pass a SQL query to execute on the database
     * @function example executeSQLStatement('SELECT $1::text as name', ['brianc'])
     * @param {string} sqlStatement - SQL statement filled with prepared statement.
     * To replace values (for inserts) with your own set $1::text in the SQL query (replace $1 with the number of the arguemnt)
     * @param {args} ...args - You can pass as many arguments as you want to be set in the SQL prepare statement.
     * @returns {Object} SQL Object from postgreSQL
     */
    static async executeSQLStatement (sqlStatement, ...args) {
        try {
            const client = await this.getPool().connect()
            const result = await client.query(sqlStatement, args)
            client.release()

            return result

        } catch (exception) {
            console.log(exception)
        }
    }

    static getPool() {
        if(!this.connectionPool) {
            this.connectionPool = new Pool({
                host: process.env.SQL_HOST,
                user: process.env.SQL_USERNAME,
                password: process.env.SQL_PASSWORD,
                database: process.env.SQL_DATABASE,
                port: process.env.SQL_PORT,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            })
        }
        return this.connectionPool;
    }
}