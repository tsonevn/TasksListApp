import {User} from "../../shared/view-models/user-model";
import observableModule = require("data/observable");
import {navigation} from "../../shared/navigation";
import frameModule = require("ui/frame");
import {TextField} from "ui/text-field";
import {TabView} from "ui/tab-view";
import {Promise} from "ts-promise";
import {Button} from "ui/button";
import {topmost} from "ui/frame";
//import {alert} from "ui/dialogs"
import {Page} from "ui/page";

var page:Page;


var user = new User(false,false);

var email:string;

export function load(args: observableModule.EventData){
    page =<Page>args.object;
     page.bindingContext = user;
}

export function backNav(data:Event){
    topmost().navigate({
        moduleName: navigation.startingPage(),
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    });
}



export function resetButton(eventData){
   
    user.resetUserAccount();
}