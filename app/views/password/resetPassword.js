"use strict";
var user_model_1 = require("../../shared/view-models/user-model");
var navigation_1 = require("../../shared/navigation");
var frame_1 = require("ui/frame");
var page;
var user = new user_model_1.User(false, false);
var email;
function load(args) {
    page = args.object;
    page.bindingContext = user;
}
exports.load = load;
function backNav(data) {
    frame_1.topmost().navigate({
        moduleName: navigation_1.navigation.startingPage(),
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    });
}
exports.backNav = backNav;
function resetButton(eventData) {
    user.resetUserAccount();
}
exports.resetButton = resetButton;
//# sourceMappingURL=resetPassword.js.map