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
    /**
     * Pass a list of SQL queries to execute. If one fails it rolls back all the other queries.
     * Only use this with update/insert/delete operations
     * @param {[{sqlStament, [args]}]} sqlStatements - SQL statement filled with prepared statement.
     * To replace values (for inserts) with your own set $1::text in the SQL query (replace $1 with the number of the arguemnt)
     * @returns boolean - if it failed or it had success with all the queries.
     */
    static async executeSQLStatementsWithTransaction(sqlStatements,) {
        try {
            const client = await this.getPool().connect()

            try {
                await client.query('BEGIN')

                try {
                    for(let i = 0; i < sqlStatements.length; i++) {
                        const sqlQuery = sqlStatements[i]
                        client.query(sqlQuery.sqlStatement, sqlQuery.args)
                    }
                    client.query('COMMIT')
                    return true
                } catch(e) {
                    client.query('ROLLBACK')
                    return false
                }
            } finally {
                client.release()
            }
        } catch (exception) {
            console.log(exception)
        }
        return false
    }

    static getPool() {
        if(!this.connectionPool) {
            this.connectionPool = new Pool({
                host: process.env.SQL_HOST,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                port: process.env.SQL_PORT,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            })
        }
        return this.connectionPool;
    }
}
