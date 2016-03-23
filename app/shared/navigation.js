"use strict";
var config_1 = require("./config");
var frameModule = require("ui/frame");
var newConfig = new config_1.Config();
var navigation;
(function (navigation) {
    function goToLoginPage() {
        frameModule.topmost().navigate({
            moduleName: "signIn_Up/main",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
        });
    }
    navigation.goToLoginPage = goToLoginPage;
    function goToPasswordPage() {
        frameModule.topmost().navigate({
            moduleName: "views/password/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
        });
    }
    navigation.goToPasswordPage = goToPasswordPage;
    function goToListPage() {
        frameModule.topmost().navigate({
            moduleName: "views/tasksView/tasks",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            },
            clearHistory: !!frameModule.topmost().ios
        });
    }
    navigation.goToListPage = goToListPage;
    function goToOldTasksListPage() {
        frameModule.topmost().navigate({
            moduleName: "views/oldTasks/oldTasks/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
        });
    }
    navigation.goToOldTasksListPage = goToOldTasksListPage;
    function goToResetPage() {
        frameModule.topmost().navigate({
            moduleName: "views/password/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
        });
    }
    navigation.goToResetPage = goToResetPage;
    function signOut() {
        newConfig.userToken = "";
    }
    navigation.signOut = signOut;
    function startingPage() {
        return newConfig.userToken ? "views/tasksView/tasks" : "signIn_Up/main";
    }
    navigation.startingPage = startingPage;
})(navigation = exports.navigation || (exports.navigation = {}));
//# sourceMappingURL=navigation.js.map