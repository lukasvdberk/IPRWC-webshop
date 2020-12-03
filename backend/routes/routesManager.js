const express = require('express')
const router = express.Router()

const ProductController = require('../controller/productController')

router.get('/products', ProductController.getAllProducts)


module.exports = router