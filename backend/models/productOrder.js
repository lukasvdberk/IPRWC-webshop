module.exports = class ProductOrder {
    constructor(product, amount) {
        this._product = product
        this._amount = amount
    }


    get product() {
        return this._product;
    }

    set product(value) {
        this._product = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    toJSON() {
        return {
            product: this._product,
            amount: this._amount
        }
    }
}
