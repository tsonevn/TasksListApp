import {Config} from "./config";
import frameModule = require("ui/frame");

var newConfig = new Config();
export module navigation{
    export function goToLoginPage(){
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
    export function goToPasswordPage() {
        frameModule.topmost().navigate({
            moduleName:"views/password/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
        });
    }

    export function goToListPage(){
        frameModule.topmost().navigate({
            moduleName:"views/tasksView/tasks",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            },
            clearHistory:!!frameModule.topmost().ios
    });
    
    }
    
    export function goToOldTasksListPage(){
        frameModule.topmost().navigate({
            moduleName:"views/oldTasks/oldTasks/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
    });
    }
    
    export function goToResetPage(){
        frameModule.topmost().navigate({
            moduleName:"views/password/resetPassword",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            }
    });
    }

    export function signOut() {
        newConfig.userToken="";
    }

    export function startingPage():string{
        return newConfig.userToken ? "views/tasksView/tasks" : "signIn_Up/main";
    }
}