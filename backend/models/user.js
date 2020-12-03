module.exports = class User {
    constructor(username) {
        this._username = username
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

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}