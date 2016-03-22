"use strict";
var virtual_array_1 = require("data/virtual-array");
var observable_1 = require("data/observable");
var config_1 = require("../config");
var task_view_model_1 = require("./task-view-model");
var EverLive = require("../../everlive");
var newConfig = new config_1.Config();
var Tasks = (function (_super) {
    __extends(Tasks, _super);
    function Tasks() {
        _super.call(this);
        this._everlive = new EverLive(newConfig.appID);
        this._tasks = this._everlive.data("Tasks");
        this._filter = new EverLive.Query();
        console.log(newConfig.userToken);
        this._filter.where().eq('UserTask', newConfig.userToken);
    }
    Object.defineProperty(Tasks.prototype, "tasksItems", {
        get: function () {
            var _this = this;
            if (!this._tasksItems) {
                this._tasksItems = new virtual_array_1.VirtualArray(1);
                this._tasksItems.loadSize = 1;
                // var newItem:Item;
                // newItem.content="jlkajslja";
                // newItem.id="1234";
                // var newTest = new Task(newItem);
                // var newItem2:Item;
                // newItem2.content="jlkajslja";
                // newItem2.id="1234";
                // var newTest2 = new Task(newItem2);
                // var newItem3:Item;
                // newItem3.content="jlkajslja";
                // newItem3.id="1234";
                // var newTest3 = new Task(newItem3);
                // var arr = [{"content":"aaaaa", id:"11111"}, {"content":"bbbbb", "id":"11111"}, {"content":"cccccc", "id":"11111"}];
                //  var arr2 = [{"content":"aaaaa"}, {"content":"bbbbb"}, {"content":"cccccc"}];
                // this._tasksItems.load(0, arr);
                var that = this;
                this._tasksItems.on(virtual_array_1.VirtualArray.itemsLoadingEvent, function (args) {
                    that._tasks.get(_this._filter)
                        .then(function (data) {
                        //    console.log(JSON.stringify(data.result));
                        var itemsToLoad = [];
                        data.result.forEach(function (it) {
                            console.log("item of Tasks array - " + it.Content);
                            //var newTask = new Task(it);
                            //    var newTask:Item;
                            //    newTask.Content = it.Content;
                            //    newTask.Id = it.Id;
                            //console.log(newTask.source.Content);
                            //console.log(newTask.source);
                            that._tasksItems.length += that._tasksItems.length;
                            // that._tasksItems.load(args.index, [new Task(it).source]);
                            itemsToLoad.push(new task_view_model_1.Task(it).source);
                            //return new Task(it);
                        });
                        // that._tasksItems.length += that._tasksItems.loadSize;
                        //console.log("new member - "+itemsToLoad);
                        that._tasksItems.length = itemsToLoad.length;
                        that._tasksItems.loadSize = itemsToLoad.length;
                        that._tasksItems.load(args.index, itemsToLoad);
                        console.log("array size - " + that._tasksItems.loadSize);
                        // var lastItem = itemsToLoad[itemsToLoad.length - 1];
                        // if (lastItem) {
                        //     after = itemsToLoad[itemsToLoad.length - 1].source.name;
                        // }
                    }, function (error) {
                        console.log(JSON.stringify(error));
                        return handleErrors(error);
                    });
                });
            }
            return this._tasksItems;
        },
        enumerable: true,
        configurable: true
    });
    Tasks.prototype.deleteTask = function (position) {
        console.log(this._tasksItems[position].Content);
    };
    Object.defineProperty(Tasks.prototype, "isScrolling", {
        get: function () {
            return this._isScrolling;
        },
        set: function (value) {
            this._isScrolling = value;
            this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "isScrolling", value: value });
        },
        enumerable: true,
        configurable: true
    });
    return Tasks;
}(observable_1.Observable));
exports.Tasks = Tasks;
function handleErrors(response) {
    if (!response.ok) {
        console.log("error");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response.json();
}
//# sourceMappingURL=task-app-view-model.js.map