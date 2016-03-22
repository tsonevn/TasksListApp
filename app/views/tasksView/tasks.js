"use strict";
var user_model_1 = require("../../shared/view-models/user-model");
var task_app_view_model_1 = require("../../shared/view-models/task-app-view-model");
var page;
var user = new user_model_1.User(false, false);
var listview;
var taskManager = new task_app_view_model_1.Tasks();
function load(args) {
    page = args.object;
    page.bindingContext = taskManager;
    listview = page.getViewById("listViewTasks");
    //loadTasksList();
}
exports.load = load;
;
// function loadTasksList(): void{
//     user.loadTasks()
//     .catch(function(){
//             console.log("error");
//             return Promise.reject(new Error("Error load tasks"));
//         })
//         .then(function name(responce:string) {
//         });
// }
// export function listTasks(args){
//     var index =<number> args.index;
//     console.log("index - "+index);
//     var tmpLabel:Label = args.object.getViewById("taskInfo");
//     console.log("id - "+tmpLabel._getValue);
// }
// listview.on(ListView.itemTapEvent, function(args: ItemEventData) {
//      var tappedItemIndex:number = args.index;
//     console.log(tappedItemIndex);
//     //taskManager.deleteTask(tappedItemIndex);
//     // Do something
// });
function signOutButton() {
}
exports.signOutButton = signOutButton;
function listTasks(args) {
    var itemIndex = args.index;
    //    console.log("tapp - "+itemIndex);
    taskManager.deleteTask(itemIndex);
}
exports.listTasks = listTasks;
//# sourceMappingURL=tasks.js.map