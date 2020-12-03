module.exports = class Product {
    constructor(name, price, description, imageUrl) {
        this._name = name;
        this._price = price;
        this._description = description;
        this._imageUrl = imageUrl;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        this._imageUrl = value;
    }
}