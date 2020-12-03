module.exports = class Customer {
    constructor(firstName, lastName, email, customerSince, phoneNumber) {
        this._firstName = firstName
        this._lastName = lastName
        this._email = email
        this._customerSince = customerSince
        this._phoneNumber = phoneNumber
    }


    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get customerSince() {
        return this._customerSince;
    }

    set customerSince(value) {
        this._customerSince = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        this._phoneNumber = value;
    }
}