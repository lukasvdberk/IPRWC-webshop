const Database = require('./database')
const User = require('../models/user')

module.exports = class UserDAO {
    static async saveUser (user, hashedPassword) {
        try {

            const result = await Database.executeSQLStatement(
                'INSERT INTO "user"(email, password) VALUES($1,$2)',
                user.email, hashedPassword
            )
            return result.rowCount === 1

        }
        catch (ignored) {
            return undefined
        }
    }

    static async getUserByEmail (email) {
        try {
            const result = await Database.executeSQLStatement(
                'SELECT * FROM "user" WHERE email=$1', email
            )
            if (result.rowCount > 0) {
                const row = result.rows[0]

                const user = new User(row.email)
                user.id = row.user_id
                user.hashPassword = row.password

                return user
            }
        } catch (ignored) {
            return undefined
        }
    }

    static async isUserAdmin (user) {
        try {

            const result = await Database.executeSQLStatement(
                'SELECT * FROM "user" WHERE user_id=$1 AND is_admin=true;', user.id
            )
            return result.rowCount > 0
        }
        catch (ignored) {
            return undefined
        }
    }
}
