"use strict";
var observable_1 = require("data/observable");
var EverLive = require("../../everlive");
var config = require("../config");
var dialogs_1 = require("ui/dialogs");
var observable_array_1 = require("data/observable-array");
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
    }
    User.prototype.login = function () {
        //console.log("email - "+this._email);
        return this._everlive.authentication.login(this._email, this._password)
            .then(function (data) {
            tmpConfig.userToken = data.result.principal_id;
            //console.log(JSON.stringify(data));
            // return data.json();
            console.log("login");
        }, function (error) {
            dialogs_1.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            console.log("error");
            return handleErrors(error);
        });
    };
    User.prototype.registration = function () {
        console.log(this._registrationEmail + " " + this._registrationPassword);
        this._everlive.Users.register(this._registrationEmail, this._registrationPassword, { "Email": this._registrationEmail }, function (data) {
            //   tmpConfig.userToken = data.result.principal_id;
            //console.log(JSON.stringify(data));
            // return data.json();
            console.log("login");
        }, function (error) {
            dialogs_1.alert({
                message: "Unfortunately we could not create your account.",
                okButtonText: "OK"
            });
            console.log("error");
            console.log(handleErrors(error));
        });
    };
    Object.defineProperty(User.prototype, "email", {
        //     loadTasks(){
        //         var Tasks = this._everlive.data("Tasks");
        //         var filter = new this._everlive.Query();
        // filter.where().eq('CreatedBy', config.Config._UserToken);
        //         // this._mytaskList
        //        return Tasks.get(filter)
        //             .then(
        //                 function(data){
        //                     console.log(JSON.stringify(data));
        //                     for(var item of data.result){
        //                         var newTask:Task;
        //                         newTask.content =item.Content;
        //                         newTask.id = item.Id;
        //                         console.log("result - "+item.Content+" - "+item.Id);
        //                         User._mytaskList.push(newTask);
        //                     }  
        //                     console.log("array size - "+User._mytaskList.length);
        //                 },
        //                 function(error){
        //                     console.log(JSON.stringify(error));
        //                     return handleErrors(error);
        //                 }
        //             )
        //     }
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