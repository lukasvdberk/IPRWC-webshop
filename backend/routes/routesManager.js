const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')
const OrderController = require('../controller/orderController')

const AuthorizationUtil = require('../util/authorizationUtil')
const AuthenticationController = require('../controller/authenticationController')

// Files route
router.use('/media', express.static('media'))

// Product routes
router.get('/products', ProductController.getAllProducts)
router.post('/products/', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addProduct)
router.patch('/products/:productId', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.editProduct)
router.delete('/products/:productId', AuthorizationUtil.isAuthenticatedAsUser, ProductController.deleteProduct)

router.post('/products/add-image/:productId', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addImageToProduct)

// Customer getting orders
router.get('/orders/', AuthorizationUtil.isAuthenticatedAsUser, OrderController.getOrdersFromUser)
router.post('/orders/', AuthorizationUtil.isAuthenticatedAsUser, OrderController.placeOrder)

router.get('/orders/all', AuthorizationUtil.isAuthenticatedAsAdmin, OrderController.getAllOrders)

// Authentication routes
router.post('/auth/login', AuthenticationController.login)
router.post('/auth/register', AuthenticationController.register)

module.exports = router
