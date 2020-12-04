const fileUpload = require('express-fileupload');

const ProductDAO = require('../dao/productDAO')
const ApiResponse = require('./utils/apiResponse')
const Product = require('../models/product')

module.exports = class ProductController {
    static parseProductFromBody(req, res) {
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const size = req.body.size;

        if (!name || !price || !description || !size || isNaN(price) ) {
            return undefined;
        } else {
            return new Product(name, price, description, size, null)
        }
    }

    static getAllProducts(req, res, next) {
        ProductDAO.getAllProducts().then((products) => {
            return ApiResponse.successResponse(products)
        }).catch((ignored) => {
            return ApiResponse.errorResponse(
                500, 'Failed to retrieve products.', res)
        })
    }

    static addProduct (req, res, next) {
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const size = req.body.size;
        const product = this.parseProductFromBody(req, res)
        if (!name || !price || !description || !size || isNaN(price) ) {
            return ApiResponse.errorResponse(
                400, 'You either did not supply a name, price, size or description', res
            )
        } else {
            return ProductDAO.saveProduct(new Product(
                name, price, description, size, null
            )).then((isSaved) => {
                if(isSaved) {
                    return ApiResponse.successResponse({
                        saved: true
                    }, res)
                } else {
                    return ApiResponse.errorResponse(500, 'Could not save product', res)
                }
            }).catch(() => {
                return ApiResponse.errorResponse(500, 'Could not save product', res)
            })

        }
    }

    static editProduct(res, req, next) {

    }

    static addImageToProduct(req, res, next) {
        const productId = req.params.productId
        const imageFile = req.files.image

        imageFile.mv('./media/products/' + imageFile.name);
        ProductDAO.addImageToProduct(productId, 'products/' + imageFile.name).then((isSaved) => {
            if (isSaved) {
                return ApiResponse.successResponse({}, res)
            } else {
                return ApiResponse.errorResponse(500, 'Failed to save image', res)
            }
        }).catch((error) => {
            return ApiResponse.errorResponse(500, 'Failed to save image', res)
        })
    }
}