const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')
const AuthenticationController = require('../controller/authenticationController')


router.get('/products', ProductController.getAllProducts)

// Authentication routes
router.post('/auth/login', AuthenticationController.login)
router.post('/auth/register', AuthenticationController.register)

module.exports = router