const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')
const OrderController = require('../controller/orderController')

const AuthorizationMiddleware = require('../middleware/authorization')
const AuthenticationController = require('../controller/authenticationController')
const CustomerController = require('../controller/customerController')


// Product routes
router.get('/api/products', ProductController.getAllProducts)
router.get('/api/products/:productId', ProductController.getProductById)

router.post('/api/products/', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.addProduct)
router.patch('/api/products/:productId', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.editProduct)
router.delete('/api/products/:productId', AuthorizationMiddleware.isAuthenticatedAsAdmin, ProductController.deleteProduct)
router.put('/api/products/:productId/image/', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.addImageToProduct)

router.get('/api/customers/me', AuthorizationMiddleware.isAuthenticatedAsUser, CustomerController.getCustomer)
router.post('/api/customers', AuthorizationMiddleware.isAuthenticatedAsUser, CustomerController.saveCustomer)

// Customer getting orders-from-customer
router.get('/api/orders/users/:userId', AuthorizationMiddleware.isAuthenticatedAsUser, OrderController.getOrdersFromCustomer)
router.get('/api/orders/all', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.getAllOrders)
router.get('/api/orders/:orderId', AuthorizationMiddleware.isAuthenticatedAsUser, OrderController.getOrderById)
router.patch('/api/orders/:orderId/status', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.updateOrderStatus)
router.delete('/api/orders/:orderId', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.deleteOrder)
router.post('/api/orders/users/:userId', AuthorizationMiddleware.isAuthenticatedAsUser, OrderController.placeOrder)

// Authentication routes
router.post('/api/auth/login', AuthenticationController.login)
router.post('/api/auth/register', AuthenticationController.register)

module.exports = router
