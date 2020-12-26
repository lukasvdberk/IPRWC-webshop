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

    /**
     * Check wheather user is authenticated as a user. Recevies standard express objects and calls next with success.
     * sets user model in req.user
     * @function
     */
    static isAuthenticatedAsUser (req, res, next) {
        const jwtToken = req.header('Bearer-token')

        const jwtPayload = AuthorizationUtil.extractJWTInformation(jwtToken)

        if (jwtPayload !== undefined) {
            req.user = new User(jwtPayload.email)
            req.user.id = jwtPayload.userId
            req.user.isAdmin = jwtPayload.isAdmin

            return next()
        } else {
            return res.status(403).json({
                success: false,
                errorMessage: 'Not authenticated'
            })
        }
    }

    /**
     * Check wheather user is authenticated as a admin. Recevies standard express objects and calls next with success.
     * sets user model in req.user and req.isAdmin
     * @function
     */
    static async isAuthenticatedAsAdmin (req, res, next) {
        const jwtToken = req.header('Bearer-token')

        const jwtPayload = AuthorizationUtil.extractJWTInformation(jwtToken)

        if (jwtPayload !== undefined) {
            const isAdminJWTClaim = jwtPayload.isAdmin

            // whether the user is still an admin else the jwt keys are valid forever
            const isAdminAccordingToDatabase = (await Database.executeSQLStatement(
                `SELECT is_admin
                FROM "user"
                WHERE user_id=$1 AND is_admin=true;`,
                jwtPayload.userId
            )).rowCount > 0

            if (isAdminJWTClaim && isAdminAccordingToDatabase) {
                req.user = new User(jwtPayload.email)
                req.user.id = jwtPayload.userId
                req.user.isAdmin = jwtPayload.isAdmin
                return next()
            } else {
                return res.status(403).json({
                    success: false,
                    errorMessage: 'Not a admin'
                })
            }
        } else {
            return res.status(403).json({
                success: false,
                errorMessage: 'Not authenticated'
            })
        }
    }
}
