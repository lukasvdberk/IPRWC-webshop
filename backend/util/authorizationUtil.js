const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Database = require('../dao/database')


module.exports = class AuthorizationUtil {
    /**
     * Hahshes password with sha512.
     * @function
     * @param {string} password - The password you want to hash.
     * @returns {Object} with {salt, passwordHash}
     */
    static async hashPassword (password) {
        const randomLength = Math.random() * 16
        const salt = bcrypt.genSaltSync(randomLength)

        return bcrypt.hash(password, salt)
    }

    /**
     * Checks is valid password
     * @function
     * @param {string} password - The password in plain text
     * @param {string} hash - The hash you want to compare to the password (likely coming from a database)
     * @returns {boolean} Success or not
     */
    static async validPassword (password, hash) {
        return bcrypt.compare(password, hash)
    }

    static getJWTKey () {
        return process.env.JWT_SECRET_KEY
    }

    /**
     * Creates a jwt key
     * @function
     * @param {Number} userId - User his id (likely coming from the database)
     * @param {string} email - User his email
     * @param {boolean} isAdmin - Wheather the user is admin or not
     * @returns {string} - The generated jwt token
     */
    static createJWT (userId, email, isAdmin) {
        const token = jwt.sign({ userId, email: email, isAdmin }, this.getJWTKey(), {
            algorithm: 'HS256'
        })

        return token
    }

    /**
     * Extracts information from JWT-key
     * @function
     * @param {Number} userId - User his id (likely coming from the database)
     * @returns {Object} - {userId,username,isAdmin} or undefined if the key is not valid
     */
    static extractJWTInformation (jwtToken) {
        try {
            const payload = jwt.verify(jwtToken, this.getJWTKey(), {
                algorithm: 'HS256'
            })

            return {
                email: payload.email,
                userId: payload.userId,
                isAdmin: payload.isAdmin
            }
        } catch (exception) {
            return undefined
        }
    }
}
