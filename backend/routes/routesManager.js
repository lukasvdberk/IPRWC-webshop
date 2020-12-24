const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')
const OrderController = require('../controller/orderController')

const AuthorizationUtil = require('../util/authorizationUtil')
const AuthenticationController = require('../controller/authenticationController')
const CustomerController = require('../controller/customerController')

// Files route
// router.use('/media', express.static('media'))

// Product routes
router.get('/api/products', ProductController.getAllProducts)
router.post('/api/products/', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addProduct)
router.patch('/api/products/:productId', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.editProduct)
router.delete('/api/products/:productId', AuthorizationUtil.isAuthenticatedAsAdmin, ProductController.deleteProduct)
router.put('/api/products/:productId/image/', AuthorizationUtil.isAuthenticatedAsAdmin ,ProductController.addImageToProduct)

router.get('/api/customer/me', AuthorizationUtil.isAuthenticatedAsUser, CustomerController.getCustomer)
// Customer getting orders-from-customer
router.get('/api/orders/user/:userId', AuthorizationUtil.isAuthenticatedAsUser, OrderController.getOrdersFromCustomer)
router.post('/api/orders/user/:userId', AuthorizationUtil.isAuthenticatedAsUser, OrderController.placeOrder)

router.get('/api/orders-from-customer/all', AuthorizationUtil.isAuthenticatedAsAdmin, OrderController.getAllOrders)

// Authentication routes
router.post('/api/auth/login', AuthenticationController.login)
router.post('/api/auth/register', AuthenticationController.register)

module.exports = router
