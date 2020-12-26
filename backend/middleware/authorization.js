const User = require('../models/user')
const Database = require('../dao/database')
const AuthorizationUtil = require('../util/authorizationUtil')

module.exports = class AuthorizationMiddleware {

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
