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
//var user:User = new User(false, false);
var listview:ListView;
var taskManager:Tasks = new Tasks();
taskManager.filterCompleted = false;

export function load(args: EventData){
    page = <Page>args.object;
    page.bindingContext = taskManager;
    listview =<ListView> page.getViewById("listViewTasks");
    
    //loadTasksList();
};


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

// export function listTasks(args:ItemEventData){
//     var itemIndex:number = args.index;
//     var itemView:View = args.view;
//     console.log("tapp - "+itemIndex);
//     taskManager.deleteTask(itemIndex);
// }
export function deleteTask(args: ItemEventData){
    var itemId:string = args.view.get("id");
    var itemIndex = taskManager.findIndex(itemId);
    taskManager.deleteTask(itemIndex, itemId);
    // console.log("--------- "+itemIndex);
   
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