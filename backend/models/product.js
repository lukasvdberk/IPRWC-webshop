module.exports = class Product {
    constructor(name, price, description, size, imageUrl) {
        this._name = name;
        this._price = price;
        this._description = description;
        this._size  = size
        this._imageUrl = imageUrl;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
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

    toJSON() {
        return {
            id: this._id,
            name: this.name,
            description: this.description,
            size: this.size,
            price: this.price,
            imageUrl: this.imageUrl,
        }
    }
}