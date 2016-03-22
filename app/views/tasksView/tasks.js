"use strict";
var task_app_view_model_1 = require("../../shared/view-models/task-app-view-model");
var frame_1 = require("ui/frame");
var navigation_1 = require("../../shared/navigation");
var page;
//var user:User = new User(false, false);
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
    navigation_1.navigation.signOut();
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
exports.signOutButton = signOutButton;
;
// export function listTasks(args:ItemEventData){
//     var itemIndex:number = args.index;
//     var itemView:View = args.view;
//     console.log("tapp - "+itemIndex);
//     taskManager.deleteTask(itemIndex);
// }
function deleteTask(args) {
    var itemId = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.deleteTask(itemIndex, itemId);
    // console.log("--------- "+itemIndex);
}
exports.deleteTask = deleteTask;
function add(args) {
    taskManager.addNewTask();
}
exports.add = add;
function toggleDone(args) {
    var tmpImage = args.view;
    tmpImage.src = 'res://checked';
    var itemId = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.updateTask(true, itemIndex, itemId);
}
exports.toggleDone = toggleDone;
function oldTask(args) {
    navigation_1.navigation.goToOldTasksListPage();
}
exports.oldTask = oldTask;
//# sourceMappingURL=tasks.js.map