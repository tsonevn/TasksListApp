import {User} from "../shared/view-models/user-model";
import observableModule = require("data/observable");
import navigation = require("../shared/navigation");
import frameModule = require("ui/frame");
import {TextField} from "ui/text-field";
import {TabView} from "ui/tab-view";
import {Promise} from "ts-promise";
import {Button} from "ui/button";
//import {alert} from "ui/dialogs"
import {Page} from "ui/page";

var page:Page;
var emailSignIn:TextField;
var passwordSignIn:TextField;
var buttonSignIn:Button;
var emailSignUp:TextField;
var passwordSignUp:TextField;
var buttonSignUp:Button;
var tabView:TabView;

 var user = new User(false,false,"example@example.com", "password");


function _init() {
    
    emailSignIn =<TextField> page.getViewById("emialSignUpField");
    passwordSignIn =<TextField>  page.getViewById("passSignUpField");
    buttonSignIn = <Button> page.getViewById("signInButton");
    emailSignUp =<TextField>  page.getViewById("emialSignUpField");
    passwordSignUp =<TextField>  page.getViewById("passSignUpField");
    buttonSignUp = <Button> page.getViewById("signUpButton");
    tabView = <TabView> page.getViewById("mainTabView");
}

export function load(args: observableModule.EventData){
    page =<Page>args.object;
     page.bindingContext = user;
    
    _init(); 
}

//--------SignIn---------

function disableSignInForm():void {
   emailSignIn.isEnabled = false;
   passwordSignIn.isEnabled = false;
   buttonSignIn.isEnabled = false;
   user.set("authenticatingsignIn", true);
}

function enableSignInForm():void {
  emailSignIn.isEnabled = true;
  passwordSignIn.isEnabled = true;
  buttonSignIn.isEnabled = true;
  user.set("authenticatingsignIn", false);
}



export function singInButton(eventData){
   
  Promise.setLongTraces(true);
    //var p = Promise.resolve();
       user.login()
        .catch(function(){
            console.log("error");
            registerNewUser();
            return Promise.reject(new Error("Error login"));
        })
        .then(navigation.goToListPage);
  
        // .then(function(status){
        //     switch (status) {
        //     case true:
        //        
        //         break;
        //     case false:
        //         tabView.selectedIndex = 1;
        //         break;
        //     default:
        //         break;
        // }
        // })
   
        
    
    
    
}

function registerNewUser(){
    tabView.selectedIndex = 1;
}

function loginUser(){
    tabView.selectedIndex = 0;
}

//--------SignUp---------

function disableSignUpForm():void {
   emailSignUp.isEnabled = false;
   passwordSignUp.isEnabled = false;
   buttonSignUp.isEnabled = false;
   user.set("authenticatingsignUp", true);
}

function enableSignUpForm():void {
  emailSignUp.isEnabled = true;
  passwordSignUp.isEnabled = true;
  buttonSignUp.isEnabled = true;
  user.set("authenticatingsignUp", false);
}

export function singUpButton(eventData) {
       user.registration()
       loginUser();
}