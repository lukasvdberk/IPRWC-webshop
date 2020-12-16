const fileUpload = require('express-fileupload');

const ProductDAO = require('../dao/productDAO')
const ApiResponse = require('./utils/apiResponse')
const Product = require('../models/product')

module.exports = class ProductController {
    static parseProductFromBody (req) {
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageURL

        if (!name || !price || !description || isNaN(price)) {
            return undefined;
        } else {
            return new Product(name, price, description, imageUrl)
        }
    }

    static getAllProducts(req, res, next) {
        ProductDAO.getAllProducts().then((products) => {
            return ApiResponse.successResponse(products, res)
        }).catch((ignored) => {
            return ApiResponse.errorResponse(
                500, 'Failed to retrieve products.', res)
        })
    }

    static addProduct (req, res, next) {
        const product = ProductController.parseProductFromBody(req)
        if (product === undefined) {
            return ApiResponse.errorResponse(
                400, 'You either did not supply a name, price, size or description', res
            )
        } else {
            return ProductDAO.saveProduct(product).then((isSaved) => {
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

    static editProduct(req, res, next) {
        const productId = req.params.productId
        const product = ProductController.parseProductFromBody(req)
        product.id = productId
        if (!productId || isNaN(productId)) {
            return ApiResponse.errorResponse(
                400, 'You either did not supply a name, price, size or description or a ' +
                'product id as parameter ', res
            )
        } else {
            return ProductDAO.editProduct(product).then((isSaved) => {
                if(isSaved) {
                    return ApiResponse.successResponse({
                        edited: true
                    }, res)
                } else {
                    return ApiResponse.errorResponse(500, 'Could not edit product', res)
                }
            }).catch(() => {
                return ApiResponse.errorResponse(500, 'Could not save product', res)
            })
        }
    }

    static deleteProduct(req, res, next) {
        const productId = req.params.productId
        if (!productId || isNaN(productId)) {
            return ApiResponse.errorResponse(
                400, 'You either did not supply a prodictid or a valid productid', res
            )
        } else {
            return ProductDAO.deleteProduct(productId).then((isDeleted) => {
                if(isDeleted) {
                    return ApiResponse.successResponse({
                        deleted: true
                    }, res)
                } else {
                    return ApiResponse.errorResponse(500, 'Product id does not exist', res)
                }
            }).catch(() => {
                return ApiResponse.errorResponse(500, 'Could not delete product', res)
            })
        }
    }

    static addImageToProduct(req, res, next) {
        const productId = req.params.productId
        const imageFile = req.files.image
        imageFile.mv('/media/products/' + imageFile.name);
        ProductDAO.getProductById(productId).then((product) => {
            product.imageUrl = 'products/' + imageFile.name
            ProductDAO.editProduct(product).then((isSaved) => {
                if (isSaved) {
                    return ApiResponse.successResponse({}, res)
                } else {
                    return ApiResponse.errorResponse(500, 'Failed to save image', res)
                }
            }).catch((error) => {
                return ApiResponse.errorResponse(500, 'Failed to save image', res)
            })
        })
    }
}
