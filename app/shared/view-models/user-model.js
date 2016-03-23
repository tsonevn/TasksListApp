"use strict";
var observable_1 = require("data/observable");
var EverLive = require("../../everlive");
var config = require("../config");
var dialogs_1 = require("ui/dialogs");
var observable_array_1 = require("data/observable-array");
var validator = require("email-validator");
var tmpConfig = new config.Config;
var User = (function (_super) {
    __extends(User, _super);
    function User(tmpAuthenticating, tmpRegistrationAuthenticating, tmpEmail, tmpPassword) {
        _super.call(this);
        this._email = tmpEmail || "";
        this._password = tmpPassword || "";
        this._authenticating = tmpAuthenticating;
        this._registrationAuthenticating = tmpRegistrationAuthenticating;
        User._mytaskList = new observable_array_1.ObservableArray();
        this._everlive = new EverLive(tmpConfig.appID);
        this._resetEmail = "";
    }
    User.prototype.login = function () {
        //console.log("email - "+this._email);
        if (this.validateEmail(this._registrationEmail)) {
            return this._everlive.authentication.login(this._email, this._password)
                .then(function (data) {
                tmpConfig.userToken = data.result.principal_id;
                console.log("login");
            }, function (error) {
                dialogs_1.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
                console.log("error");
                return handleErrors(error);
            });
        }
        else {
            dialogs_1.alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
            });
        }
    };
    User.prototype.registration = function () {
        if (this.validateEmail(this._registrationEmail)) {
            console.log(this._registrationEmail + " " + this._registrationPassword);
            this._everlive.Users.register(this._registrationEmail, this._registrationPassword, { "Email": this._registrationEmail }, function (data) {
                console.log("login");
            }, function (error) {
                dialogs_1.alert({
                    message: "Unfortunately we could not create your account.",
                    okButtonText: "OK"
                });
                console.log("error");
                console.log(handleErrors(error));
            });
        }
        else {
            dialogs_1.alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
            });
        }
    };
    User.prototype.resetUserAccount = function () {
        if (this.validateEmail(this._resetEmail)) {
            this._everlive.Users.resetPassword({ "Email": this._resetEmail }, function (data) {
                console.log(JSON.stringify(data));
                dialogs_1.alert({
                    message: "We send you reset password Email.",
                    okButtonText: "OK"
                });
            }, function (error) {
                dialogs_1.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
                console.log(JSON.stringify(error));
            });
        }
        else {
            dialogs_1.alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
            });
        }
    };
    User.prototype.validateEmail = function (tmpValidateEmail) {
        return validator.validate(tmpValidateEmail);
    };
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "email", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "registrationemail", {
        get: function () {
            return this._registrationEmail;
        },
        set: function (value) {
            this._registrationEmail = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "registrationemail", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._password = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "password", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "registrationpassword", {
        get: function () {
            return this._registrationPassword;
        },
        set: function (value) {
            this._registrationPassword = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "registrationpassword", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "resetEmail", {
        get: function () {
            return this._resetEmail;
        },
        set: function (value) {
            this._resetEmail = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "resetEmail", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "authenticating", {
        get: function () {
            return this._authenticating;
        },
        set: function (value) {
            this.authenticating = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "authenticating", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "registrationAuthenticating", {
        get: function () {
            return this._registrationAuthenticating;
        },
        set: function (value) {
            this._registrationAuthenticating = value;
            _super.prototype.notify.call(this, { object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "registrationAuthenticating", value: value });
        },
        enumerable: true,
        configurable: true
    });
    return User;
}(observable_1.Observable));
exports.User = User;
function handleErrors(response) {
    if (!response.ok) {
        console.log("error");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response.json();
}
//# sourceMappingURL=user-model.js.map