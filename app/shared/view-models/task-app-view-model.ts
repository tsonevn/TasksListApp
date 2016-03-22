import {VirtualArray, ItemsLoading as virtualArrayItemsLoadingData} from "data/virtual-array";
import {Observable} from "data/observable";
import {Config} from "../config";
import {Task, Item} from "./task-view-model";
import EverLive = require("../../everlive");
import {confirm, alert} from "ui/dialogs"

var newConfig:Config = new Config();

export class Tasks extends Observable{
    private _tasksItems:VirtualArray<Item>;
    private _tasks;
    private _everlive;
    private _isScrolling:boolean;
    private _filter:EverLive.Query;
    private itemsToLoad:Item[];
    private _newTask:string;
    private _doneCheckBox:boolean;
    private _filterCompleted:boolean;
    constructor(){
        super();
        this._everlive = new EverLive(newConfig.appID);
        this._tasks = this._everlive.data("Tasks");
        this._isScrolling = true;
        this._filterCompleted = false;
        this._filter = new EverLive.Query();
        
        this._newTask = "";
        this._doneCheckBox=false;
        //this.itemsToLoad= [];
        
        console.log(newConfig.userToken);
    }
    
    findIndex(value: string):number{
       for(var i=0; i < this.itemsToLoad.length; i++){
           if(value == this.itemsToLoad[i].Id){
               return i;
           }
       }
       return -1;
    }
    
    get tasksItems(): VirtualArray<Item>{
        this._filter
                .where()
                        .and()
                            .eq('UserTask', newConfig.userToken)
                            .eq('Completed', this._filterCompleted)
                .done();
        
        
        
        if(!this._tasksItems){
        this._tasksItems = new VirtualArray<Item>(1);
        this._tasksItems.loadSize = 1;
        


        var that = this;
        this._tasksItems.on(VirtualArray.itemsLoadingEvent, (args: virtualArrayItemsLoadingData) =>{
            that._tasks.get(this._filter)
            .then(
                function(data){
                that.itemsToLoad=[];
                   data.result.forEach(it=> {
                      //console.log("item of Tasks array - "+it.Content);
                      that._tasksItems.length += that._tasksItems.length;
                      that.itemsToLoad.push(new Task(it).source);   
                    });
                    
                    that._tasksItems.length = that.itemsToLoad.length;
                    that._tasksItems.loadSize = that.itemsToLoad.length;
                    that._tasksItems.load(args.index, that.itemsToLoad); 
                },
                function(error){
                    console.log(JSON.stringify(error));
                    return handleErrors(error);
                }
            )
        
         });
        }
        return this._tasksItems;
    }
    
    deleteTask(position: number, itemId:string){
        
       var that = this;
       
       confirm({
           title: "DELETE",
            message: "the task will be delete",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
       }).then(function(result){
           console.log(result);
           if(result == true){
               console.log( that._tasksItems.getItem(position).Content);
                that.itemsToLoad.splice(position,1);
                that._tasksItems.length = that.itemsToLoad.length;
                that._tasksItems.loadSize = that.itemsToLoad.length;
                that._tasksItems.load(0, that.itemsToLoad);
                
                
                
                that._tasks.destroySingle({ Id: itemId },
                        function(){
                            alert('Item successfully deleted.');
                        },
                        function(error){
                            that.tasksItems;
                            
                            console.log(JSON.stringify(error));
                            console.log( handleErrors(error));
                        });
           }
         });
        
        }
        
        addNewTask(){
            var that = this
            
            this._tasks.create({ 'Content' : this._newTask, 'UserTask':newConfig.userToken, 'Completed': false},
                function(data){
                    console.log(JSON.stringify(data));
                    console.log("jkshjkshdjkvh");
                    console.log(that._newTask);
                     console.log(data.result.Id);
                    
                    that.itemsToLoad.push({Content:that._newTask,Id:data.result.Id});
                    
                    that._tasksItems.length = that.itemsToLoad.length;
                    that._tasksItems.loadSize = that.itemsToLoad.length;
                    that._tasksItems.load(0, that.itemsToLoad);
                    
                    that.newTask = "";
                    
                },
                function(error){
                    console.log(JSON.stringify(error));
                    console.log( handleErrors(error));
                });
        }
        
        
        updateTask(complate:boolean, position: number, itemId:string){
            
            var that = this;
            
            this._tasks.updateSingle({ Id: itemId, 'Completed': complate },
                function(data){
                    that.itemsToLoad.splice(position,1);
                    that._tasksItems.length = that.itemsToLoad.length;
                    that._tasksItems.loadSize = that.itemsToLoad.length;
                    that._tasksItems.load(0, that.itemsToLoad);
                },
                function(error){
                     console.log(JSON.stringify(error));
                    console.log( handleErrors(error));
                });
        }
        
        
        get isScrolling(): boolean{
            return this._isScrolling;
        }
        
        set isScrolling(value: boolean){
            this._isScrolling = value;
            this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "isScrolling", value: value });
        }
        
        
        get newTask(): string{
            return this._newTask;
        }
        
        set newTask(value: string){
            this._newTask = value;
            this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "newTask", value: value });
        }
        
        get done(): boolean{
            return this._doneCheckBox;
        }
        
        set done(value: boolean){
            this._doneCheckBox = value;
            this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "done", value: value });
        }
        
        get filterCompleted(): boolean{
            return this._filterCompleted;
        }
        
        set filterCompleted(value: boolean){
            this._filterCompleted = value;
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