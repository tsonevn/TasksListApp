"use strict";
var task_app_view_model_1 = require("../../shared/view-models/task-app-view-model");
var frame_1 = require("ui/frame");
var navigation_1 = require("../../shared/navigation");
var page;
var listview;
var taskManager = new task_app_view_model_1.Tasks();
taskManager.filterCompleted = false;
function load(args) {
    page = args.object;
    page.bindingContext = taskManager;
    listview = page.getViewById("listViewTasks");
}
exports.load = load;
;
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
function deleteTask(args) {
    var itemId = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.deleteTask(itemIndex, itemId);
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