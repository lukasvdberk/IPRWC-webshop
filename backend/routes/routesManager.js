const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')
const OrderController = require('../controller/orderController')

const AuthorizationMiddleware = require('../middleware/authorization')
const AuthenticationController = require('../controller/authenticationController')
const CustomerController = require('../controller/customerController')


// Product routes
router.get('/api/products', ProductController.getAllProducts)
router.get('/api/product/:productId', ProductController.getProductById)

router.post('/api/products/', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.addProduct)
router.patch('/api/products/:productId', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.editProduct)
router.delete('/api/products/:productId', AuthorizationMiddleware.isAuthenticatedAsAdmin, ProductController.deleteProduct)
router.put('/api/products/:productId/image/', AuthorizationMiddleware.isAuthenticatedAsAdmin ,ProductController.addImageToProduct)

router.get('/api/customer/me', AuthorizationMiddleware.isAuthenticatedAsUser, CustomerController.getCustomer)
router.post('/api/customer', AuthorizationMiddleware.isAuthenticatedAsUser, CustomerController.saveCustomer)

// Customer getting orders-from-customer
router.get('/api/orders/user/:userId', AuthorizationMiddleware.isAuthenticatedAsUser, OrderController.getOrdersFromCustomer)
router.get('/api/orders/all', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.getAllOrders)
router.patch('/api/order/:orderId/status', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.updateOrderStatus)


router.post('/api/orders/user/:userId', AuthorizationMiddleware.isAuthenticatedAsUser, OrderController.placeOrder)

router.get('/api/orders-from-customer/all', AuthorizationMiddleware.isAuthenticatedAsAdmin, OrderController.getAllOrders)

// Authentication routes
router.post('/api/auth/login', AuthenticationController.login)
router.post('/api/auth/register', AuthenticationController.register)

module.exports = router
