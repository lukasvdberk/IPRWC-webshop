const Database = require('./database')
const Product = require('../models/product')


module.exports = class ProductDAO {
    static queryResultToModel(productQueryResult) {
        if (productQueryResult.rowCount > 0) {
            const productModels = []
            for(let i = 0; i < productQueryResult.rows.length; i++) {

                const productFromDatabase = productQueryResult.rows[i]
                let product = new Product(
                    productFromDatabase.name,
                    productFromDatabase.price,
                    productFromDatabase.description,
                    productFromDatabase.size,
                    productFromDatabase.image_url
                )
                product.id = productFromDatabase.product_id
                productModels.push(product)
            }
            return productModels
        }
        return []
    }

    static async getAllProducts() {
        const allProductsQueryResult = await Database.executeSQLStatement(
            `SELECT * FROM product WHERE isActive=true`
        )
        return this.queryResultToModel(allProductsQueryResult)
    }

    static async getProductById(productId) {
        const productById = await Database.executeSQLStatement(
            `SELECT * FROM product WHERE product_id=$1 AND isActive=true`,
            productId
        )

        return this.queryResultToModel(productById)[0]
    }

    static async saveProduct(product) {
        const productSaveQueryResult = await Database.executeSQLStatement(
            `INSERT INTO product (name, price, size, description) 
                VALUES ($1, $2, $3, $4)`,
            product.name, product.price, product.size,product.description
        )
        return productSaveQueryResult.rowCount > 0;
    }

    static async editProduct(product) {
        const updatedProductQueryResult = await Database.executeSQLStatement(
            `
                UPDATE product
                SET name=$1,
                    price=$2,
                    description=$3,
                    size=$4,
                    image_url=$5
                WHERE product_id=$6;
            `,
            product.name, product.price, product.description, product.size, product.imageUrl, product.id
        )
        return updatedProductQueryResult.rowCount > 0;
    }

    static async deleteProduct(productId) {
        const deletedProductQueryResult = await Database.executeSQLStatement(
            `UPDATE product
                SET isActive=false
                WHERE product_id=$1`,
            productId
        )
        return deletedProductQueryResult.rowCount > 0;
    }
}
