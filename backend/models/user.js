module.exports = class User {
    constructor(username) {
    }

    constructor(username, password) {
        this._username = username
        this._password = password
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