"use strict";
var config_1 = require("./config");
var frameModule = require("ui/frame");
var newConfig = new config_1.Config();
function goToLoginPage() {
    frameModule.topmost().navigate("signIn_Up/main");
}
exports.goToLoginPage = goToLoginPage;
function goToPasswordPage() {
    frameModule.topmost().navigate("views/password/resetPassword");
}
exports.goToPasswordPage = goToPasswordPage;
function goToListPage() {
    frameModule.topmost().navigate({
        moduleName: "views/tasksView/tasks",
        clearHistory: !!frameModule.topmost().ios
    });
}
exports.goToListPage = goToListPage;
function signOut() {
    newConfig.invalidateToken();
}
exports.signOut = signOut;
function startingPage() {
    return newConfig.userToken ? "views/tasksView/tasks" : "signIn_Up/main";
}
exports.startingPage = startingPage;
//# sourceMappingURL=navigation.js.map