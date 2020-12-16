module.exports = class ProductOrder {
    constructor(product, amount, size) {
        this._product = product
        this._amount = amount
        this._size = size
    }


    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
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
            amount: this._amount,
            size: this._size
        }
    }
}
