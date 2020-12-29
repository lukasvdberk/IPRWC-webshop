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
        try {
            const allProductsQueryResult = await Database.executeSQLStatement(
                `SELECT * FROM product WHERE isActive=true`
            )
            return this.queryResultToModel(allProductsQueryResult)
        } catch (ignored) {
            console.log(ignored)
            return undefined
        }
    }

    static async getProductById(productId) {
        try {
            const productById = await Database.executeSQLStatement(
                `SELECT * FROM product WHERE product_id=$1 AND isActive=true`,
                productId
            )
            return this.queryResultToModel(productById)[0]
        }
        catch (ignored) {
            console.log(ignored)
            return undefined
        }
    }

    static async saveProduct(product) {
        try {
            const productSaveQueryResult = await Database.executeSQLStatement(
                `INSERT INTO product (name, price, description) 
                VALUES ($1, $2, $3) RETURNING product_id`,
                product.name, product.price, product.description
            )
            if (productSaveQueryResult.rowCount > 0) {
                return productSaveQueryResult.rows[0].product_id
            } else {
                return undefined
            }
        } catch (ignored) {
            console.log(ignored)
            return undefined
        }
    }

    static async editProduct(product) {
        try{
            const updatedProductQueryResult = await Database.executeSQLStatement(
                `
                    UPDATE product
                    SET name=$1,
                        price=$2,
                        description=$3,
                        image_url=$4
                    WHERE product_id=$5;
                `,
                product.name, product.price, product.description, product.imageUrl, product.id
            )
            return updatedProductQueryResult.rowCount > 0;
        } catch (ignored) {
            console.log(ignored)
            return undefined
        }
    }

    static async deleteProduct(productId) {
        try {
            const deletedProductQueryResult = await Database.executeSQLStatement(
                `UPDATE product
                SET isActive=false
                WHERE product_id=$1`,
                productId
            )
            return deletedProductQueryResult.rowCount > 0;
        } catch (ignored) {
            console.log(ignored)
            return false
        }
    }
}
