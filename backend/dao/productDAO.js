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
}