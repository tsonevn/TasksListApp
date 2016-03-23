import {User} from "../../shared/view-models/user-model";
import {Tasks} from "../../shared/view-models/task-app-view-model"
import {Page} from "ui/page";
import {EventData} from "data/observable";
import {Promise} from "ts-promise";
import {ListView, ItemEventData} from "ui/list-view";
import {Label} from "ui/label";
import {View} from "ui/core/view";
import {Span} from "text/span";
import {Image} from "ui/image";
import {topmost} from "ui/frame";
import {navigation} from "../../shared/navigation";


var page:Page;
var listview:ListView;
var taskManager:Tasks = new Tasks();
taskManager.filterCompleted = false;

export function load(args: EventData){
    page = <Page>args.object;
    page.bindingContext = taskManager;
    listview =<ListView> page.getViewById("listViewTasks");
    
};

export function signOutButton(){
    navigation.signOut();
    topmost().navigate({
        moduleName: navigation.startingPage(),
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    });
};

export function deleteTask(args: ItemEventData){
    var itemId:string = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.deleteTask(itemIndex, itemId); 
}

export function add(args:EventData){
   taskManager.addNewTask();
}

export function toggleDone(args: ItemEventData){
    var tmpImage:Image =<Image> args.view;
    tmpImage.src = 'res://checked';
    var itemId:string = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.updateTask(true, itemIndex, itemId);
}

export function oldTask(args:EventData){
    navigation.goToOldTasksListPage();
}