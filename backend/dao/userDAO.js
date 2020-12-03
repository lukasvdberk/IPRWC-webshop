const Database = require('./database')
const User = require('../models/user')

module.exports = class UserDAO {
    static async saveUser (user, hashedPassword) {
        const result = await Database.executeSQLStatement(
            'INSERT INTO "user"(username, password) VALUES($1,$2)',
            user.username, hashedPassword
        )

        return result.rowCount === 1
    }

    static async getUserByUsername (username) {
        const result = await Database.executeSQLStatement(
            'SELECT * FROM "user" WHERE username=$1', username
        )
        if (result.rowCount > 0) {
            const row = result.rows[0]

            const user = new User(row.username)
            user.id = row.user_id
            user.hashPassword = row.password

            return user
        }

        return undefined
    }

    static async isUserAdmin (user) {
        const result = await Database.executeSQLStatement(
            'SELECT * FROM "user" WHERE user_id=$1 AND is_admin=true;', user.id
        )

        return result.rowCount > 0
    }
}