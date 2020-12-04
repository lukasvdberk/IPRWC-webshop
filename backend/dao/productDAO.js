const Database = require('./database')
const Product = require('../models/product')


module.exports = class ProductDAO {
    static async getAllProducts() {
        const allProductsQueryResult = await Database.executeSQLStatement(
            `SELECT * FROM product`
        )
        if (allProductsQueryResult.rowCount > 0) {
            const productModels = []
            for(let i = 0; i < allProductsQueryResult.rows.length; i++) {

                const productFromDatabase = allProductsQueryResult.rows[i]
                productModels.push(
                    new Product(
                        productFromDatabase.name,
                        productFromDatabase.price,
                        productFromDatabase.description,
                        productFromDatabase.imageUrl
                    )
                )
            }
            return productModels
        }
        return []
    }

    static async saveProduct(product) {
        const productSaveQueryResult = await Database.executeSQLStatement(
            `INSERT INTO product (name, price, size, description) 
                VALUES ($1, $2, $3, $4)`,
            product.name, product.price, product.size,product.description
        )
        return productSaveQueryResult.rowCount > 0;
    }

    static async addImageToProduct(productId, imageUrl) {
        const updatedProductQueryResult = await Database.executeSQLStatement(
            `
                UPDATE product
                SET image_url = $1
                WHERE product_id=$2
            `,
            imageUrl, productId
        )
        return updatedProductQueryResult.rowCount > 0;
    }
}