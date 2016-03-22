import {User} from "../../shared/view-models/user-model";
import {Tasks} from "../../shared/view-models/task-app-view-model"
import {Page} from "ui/page";
import {EventData} from "data/observable";
import {Promise} from "ts-promise";
import {ListView, ItemEventData} from "ui/list-view";
import {Label} from "ui/label";
import {View} from "ui/core/view";
import {Span} from "text/span";


var page:Page;
var user:User = new User(false, false);
var listview:ListView;
var taskManager:Tasks = new Tasks();

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
    
}
export function listTasks(args:ItemEventData){
    var itemIndex:number = args.index;
//    console.log("tapp - "+itemIndex);
   taskManager.deleteTask(itemIndex);
}