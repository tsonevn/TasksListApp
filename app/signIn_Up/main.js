"use strict";
var user_model_1 = require("../shared/view-models/user-model");
var navigation = require("../shared/navigation");
var ts_promise_1 = require("ts-promise");
var page;
var emailSignIn;
var passwordSignIn;
var buttonSignIn;
var emailSignUp;
var passwordSignUp;
var buttonSignUp;
var tabView;
var user = new user_model_1.User(false, false, "example@example.com", "password");
function _init() {
    emailSignIn = page.getViewById("emialSignUpField");
    passwordSignIn = page.getViewById("passSignUpField");
    buttonSignIn = page.getViewById("signInButton");
    emailSignUp = page.getViewById("emialSignUpField");
    passwordSignUp = page.getViewById("passSignUpField");
    buttonSignUp = page.getViewById("signUpButton");
    tabView = page.getViewById("mainTabView");
}
function load(args) {
    page = args.object;
    page.bindingContext = user;
    _init();
}
exports.load = load;
//--------SignIn---------
function disableSignInForm() {
    emailSignIn.isEnabled = false;
    passwordSignIn.isEnabled = false;
    buttonSignIn.isEnabled = false;
    user.set("authenticatingsignIn", true);
}
function enableSignInForm() {
    emailSignIn.isEnabled = true;
    passwordSignIn.isEnabled = true;
    buttonSignIn.isEnabled = true;
    user.set("authenticatingsignIn", false);
}
function singInButton(eventData) {
    ts_promise_1.Promise.setLongTraces(true);
    //var p = Promise.resolve();
    user.login()
        .catch(function () {
        console.log("error");
        registerNewUser();
        return ts_promise_1.Promise.reject(new Error("Error login"));
    })
        .then(navigation.goToListPage);
    // .then(function(status){
    //     switch (status) {
    //     case true:
    //        
    //         break;
    //     case false:
    //         tabView.selectedIndex = 1;
    //         break;
    //     default:
    //         break;
    // }
    // })
}
exports.singInButton = singInButton;
function registerNewUser() {
    tabView.selectedIndex = 1;
}
function loginUser() {
    tabView.selectedIndex = 0;
}
//--------SignUp---------
function disableSignUpForm() {
    emailSignUp.isEnabled = false;
    passwordSignUp.isEnabled = false;
    buttonSignUp.isEnabled = false;
    user.set("authenticatingsignUp", true);
}
function enableSignUpForm() {
    emailSignUp.isEnabled = true;
    passwordSignUp.isEnabled = true;
    buttonSignUp.isEnabled = true;
    user.set("authenticatingsignUp", false);
}
function singUpButton(eventData) {
    user.registration();
    loginUser();
}
exports.singUpButton = singUpButton;
//# sourceMappingURL=main.js.map