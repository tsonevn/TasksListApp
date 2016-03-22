import {Config} from "./config";
import frameModule = require("ui/frame");

var newConfig = new Config();

export function goToLoginPage(){
    frameModule.topmost().navigate("signIn_Up/main");
}
export function goToPasswordPage() {
    frameModule.topmost().navigate("views/password/resetPassword");
}

export function goToListPage(){
    frameModule.topmost().navigate({
        moduleName:"views/tasksView/tasks",
        clearHistory:!!frameModule.topmost().ios
});
}

export function signOut() {
    newConfig.invalidateToken();
}

export function startingPage():string{
    return newConfig.userToken ? "views/tasksView/tasks" : "signIn_Up/main";
}