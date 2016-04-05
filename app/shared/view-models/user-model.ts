import {Observable} from "data/observable";
import EverLive = require("../../everlive");
import config =require("../config");
import {alert} from "ui/dialogs";
import {Promise} from "ts-promise";
import {ObservableArray} from "data/observable-array";
import validator = require("email-validator");

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
    private _resetEmail;
    
   constructor(tmpAuthenticating:boolean,tmpRegistrationAuthenticating:boolean,tmpEmail?:string, tmpPassword?:string){
       super();
       this._email = tmpEmail || "";
       this._password = tmpPassword || "";
       this._authenticating = tmpAuthenticating;
       this._registrationAuthenticating = tmpRegistrationAuthenticating;
       User._mytaskList = new ObservableArray();
       this._everlive =new  EverLive(tmpConfig.appID);
       this._resetEmail = "";
   }
   
   login(){
       //console.log("email - "+this._email);
       if(this.validateEmail(this._email)){
        return this._everlive.authentication.login(this._email, this._password) 
                .then(function (data) { // success callback
                    tmpConfig.userToken = data.result.principal_id;
                console.log("login");
                //console.log(tmpConfig.userToken);
                return true;
            },
            function(error) { 
                alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
                console.log("error");
                return handleErrors(error);
            });
       }
       else{
           alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
             });
       }
      
   }
   registration(){
       if(this.validateEmail(this._registrationEmail)){
        console.log(this._registrationEmail+" "+this._registrationPassword);
        this._everlive.Users.register(this._registrationEmail,
        this._registrationPassword,
        {"Email":this._registrationEmail},
        function (data) { 
                console.log("login");
            },
            function(error) { 
                alert({
                    message: "Unfortunately we could not create your account.",
                    okButtonText: "OK"
                });
                console.log("error");
                console.log( handleErrors(error));
            });
        }
        else{
            alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
             });
        }
      
    }
    
    resetUserAccount(){
        if(this.validateEmail(this._resetEmail)){
            this._everlive.Users.resetPassword({"Email": this._resetEmail},
                function (data) {
                    console.log(JSON.stringify(data));
                    alert({
                        message: "We send you reset password Email.",
                        okButtonText: "OK"
                    });
                },
                function(error){
                    alert({
                        message: "Unfortunately we could not find your account.",
                        okButtonText: "OK"
                    });
                    console.log(JSON.stringify(error));
            });
        }
        else{
            alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
             });
        }
    }
    
    validateEmail(tmpValidateEmail:string):boolean{
        return validator.validate(tmpValidateEmail);
    }

   
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
   
   public get resetEmail(): string{
       return this._resetEmail;
   }
   public set resetEmail(value: string){
       this._resetEmail = value;
       super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "resetEmail", value: value });
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
 }

function handleErrors(response) {
	if (!response.ok) {
        console.log("error");
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
    return response.json();
}