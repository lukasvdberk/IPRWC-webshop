module.exports = class ApiResponse {
    /**
     * Sends a response as a error message.
     * @function
     * @param {Number} statusCode - The http status code.
     * @param {Object} errorMessage - The error message.
     * @param {ExpressRes} res - A valid express response object to send the response with.
     */
    static errorResponse (statusCode, errorMessage, res) {
        return res.status(statusCode).json({
            success: false,
            errorMessage: errorMessage
        })
    }

    /**
     * Sends a response with a success message
     * @function
     * @param {Object|String} content - Extra content you want to send. Can be anything from a object to a string
     * @param {ExpressRes} res - A valid express response object to send the response with.
     */
    static successResponse (content, res) {
        return res.status(200).json({
            success: true,
            content: content
        })
    }
}