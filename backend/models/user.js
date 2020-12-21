module.exports = class User {
    constructor(email) {
        this._email = email
    }

    set isAdmin (isAdmin) {
        this._isAdmin = isAdmin
    }

    get isAdmin () {
        return this._isAdmin
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            isAdmin: this.isAdmin
        }
    }
}
