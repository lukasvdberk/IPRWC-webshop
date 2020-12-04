const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')

const AuthorizationUtil = require('../util/authorizationUtil')
const AuthenticationController = require('../controller/authenticationController')

// Files route
router.use('/media', express.static('media'))

// Product routes
router.get('/products', ProductController.getAllProducts)
router.post('/products/', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addProduct)
router.patch('/products/', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.)
router.post('/products/add-image/:productId', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addImageToProduct)

// Authentication routes
router.post('/auth/login', AuthenticationController.login)
router.post('/auth/register', AuthenticationController.register)

module.exports = router