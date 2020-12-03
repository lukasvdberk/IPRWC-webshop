module.exports = class Order {
    constructor(customer, orderedOn, productOrders) {
        this._customer = customer
        this._orderedOn = orderedOn
        this._productOrders = productOrders;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get orderedOn() {
        return this._orderedOn;
    }

    set orderedOn(value) {
        this._orderedOn = value;
    }


    get productOrders() {
        return this._productOrders;
    }

    set productOrders(value) {
        this._productOrders = value;
    }
}