import {Observable} from "data/observable";
import EverLive = require("../../everlive");
import config =require("../config");
import {alert} from "ui/dialogs"
import {Promise} from "ts-promise"
import {ObservableArray} from "data/observable-array"

var tmpConfig:config.Config = new  config.Config;

interface Task{
    content:string,
    id:string
}

export class User extends Observable{
    private _email:string;
    private _password:string;
    private _registrationEmail:string;
    private _registrationPassword:string;
    private _authenticating:boolean;
    private _registrationAuthenticating:boolean;
    static _mytaskList;
    private _everlive;
    
   constructor(tmpAuthenticating:boolean,tmpRegistrationAuthenticating:boolean,tmpEmail?:string, tmpPassword?:string){
       super();
       this._email = tmpEmail || "";
       this._password = tmpPassword || "";
       this._authenticating = tmpAuthenticating;
       this._registrationAuthenticating = tmpRegistrationAuthenticating;
       User._mytaskList = new ObservableArray();
       this._everlive =new  EverLive(tmpConfig.appID);
   }
   
   login(){
       //console.log("email - "+this._email);
      return this._everlive.authentication.login(this._email, this._password) 
            .then(function (data) { // success callback
                tmpConfig.userToken = data.result.principal_id;
                //console.log(JSON.stringify(data));
               // return data.json();
               console.log("login");
        },
        function(error) { 
            alert({
				message: "Unfortunately we could not find your account.",
				okButtonText: "OK"
			});
            console.log("error");
            return handleErrors(error);
        })
      
   }
   registration(){
       console.log(this._registrationEmail+" "+this._registrationPassword);
       this._everlive.Users.register(this._registrationEmail,
       this._registrationPassword,
       {"Email":this._registrationEmail},
       function (data) { // success callback
             //   tmpConfig.userToken = data.result.principal_id;
                //console.log(JSON.stringify(data));
               // return data.json();
               console.log("login");
        },
        function(error) { 
            alert({
				message: "Unfortunately we could not create your account.",
				okButtonText: "OK"
			});
            console.log("error");
            console.log( handleErrors(error));
        })
      
    }
//     loadTasks(){
//         var Tasks = this._everlive.data("Tasks");
//         var filter = new this._everlive.Query();
// filter.where().eq('CreatedBy', config.Config._UserToken);

//         // this._mytaskList
//        return Tasks.get(filter)
//             .then(
//                 function(data){
//                     console.log(JSON.stringify(data));
//                     for(var item of data.result){
//                         var newTask:Task;
//                         newTask.content =item.Content;
//                         newTask.id = item.Id;
//                         console.log("result - "+item.Content+" - "+item.Id);
//                         User._mytaskList.push(newTask);
                        
//                     }  
//                     console.log("array size - "+User._mytaskList.length);
//                 },
//                 function(error){
//                     console.log(JSON.stringify(error));
//                     return handleErrors(error);
//                 }
//             )
//     }

   
   public get email(): string{
       return this._email;
   }
   public set email(value: string){
       this._email = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "email", value: value });
   }
   
   public get registrationemail(): string{
       return this._registrationEmail;
   }
   public set registrationemail(value: string){
       this._registrationEmail = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "registrationemail", value: value });
   }
   
   public get password(): string{
       return this._email;
   }
   public set password(value: string){
       this._password = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "password", value: value });
   }
   
   public get registrationpassword(): string{
       return this._registrationPassword;
   }
   public set registrationpassword(value: string){
       this._registrationPassword = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "registrationpassword", value: value });
   }
   
   public get authenticating(): boolean{
       return this._authenticating;
   }
   public set authenticating(value: boolean){
       this.authenticating = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "authenticating", value: value });
   }
   
   public get registrationAuthenticating(): boolean{
       return this._registrationAuthenticating;
   }
   public set registrationAuthenticating(value: boolean){
       this._registrationAuthenticating = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "registrationAuthenticating", value: value });
   }
   
//    public get mytaskList(): {
//        return this._mytaskList;
//    }
//    public set mytaskList(value: JSON){
//        this._mytaskList = value;
//        super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "mytaskList", value: value });
//    }
   
}

function handleErrors(response) {
	if (!response.ok) {
        console.log("error");
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
    return response.json();
}