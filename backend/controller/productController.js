const ProductDAO = require('../dao/productDAO')

module.exports = class ProductController {
    static getAllProducts(req, res, next) {
        ProductDAO.getAllProducts().then((products) => {
            return res.json(products)
        }).catch((ignored) => {
            return res.status(500).json({
                errorMessage: 'Failed to retrieve products.'
            })
        })
    }
}