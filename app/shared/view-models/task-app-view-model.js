"use strict";
var virtual_array_1 = require("data/virtual-array");
var observable_1 = require("data/observable");
var config_1 = require("../config");
var task_view_model_1 = require("./task-view-model");
var EverLive = require("../../everlive");
var dialogs_1 = require("ui/dialogs");
var newConfig = new config_1.Config();
var Tasks = (function (_super) {
    __extends(Tasks, _super);
    function Tasks() {
        _super.call(this);
        this._everlive = new EverLive(newConfig.appID);
        this._tasks = this._everlive.data("Tasks");
        this._isScrolling = true;
        this._filterCompleted = false;
        this._filter = new EverLive.Query();
        this._newTask = "";
        this._doneCheckBox = false;
        //this.itemsToLoad= [];
        console.log(newConfig.userToken);
    }
    Tasks.prototype.findIndex = function (value) {
        for (var i = 0; i < this.itemsToLoad.length; i++) {
            if (value == this.itemsToLoad[i].Id) {
                return i;
            }
        }
        return -1;
    };
    Object.defineProperty(Tasks.prototype, "tasksItems", {
        get: function () {
            var _this = this;
            this._filter
                .where()
                .and()
                .eq('UserTask', newConfig.userToken)
                .eq('Completed', this._filterCompleted)
                .done();
            if (!this._tasksItems) {
                this._tasksItems = new virtual_array_1.VirtualArray(1);
                this._tasksItems.loadSize = 1;
                var that = this;
                this._tasksItems.on(virtual_array_1.VirtualArray.itemsLoadingEvent, function (args) {
                    that._tasks.get(_this._filter)
                        .then(function (data) {
                        that.itemsToLoad = [];
                        data.result.forEach(function (it) {
                            //console.log("item of Tasks array - "+it.Content);
                            that._tasksItems.length += that._tasksItems.length;
                            that.itemsToLoad.push(new task_view_model_1.Task(it).source);
                        });
                        that._tasksItems.length = that.itemsToLoad.length;
                        that._tasksItems.loadSize = that.itemsToLoad.length;
                        that._tasksItems.load(args.index, that.itemsToLoad);
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
    Tasks.prototype.deleteTask = function (position, itemId) {
        var that = this;
        dialogs_1.confirm({
            title: "DELETE",
            message: "the task will be delete",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            console.log(result);
            if (result == true) {
                console.log(that._tasksItems.getItem(position).Content);
                that.itemsToLoad.splice(position, 1);
                that._tasksItems.length = that.itemsToLoad.length;
                that._tasksItems.loadSize = that.itemsToLoad.length;
                that._tasksItems.load(0, that.itemsToLoad);
                that._tasks.destroySingle({ Id: itemId }, function () {
                    dialogs_1.alert('Item successfully deleted.');
                }, function (error) {
                    that.tasksItems;
                    console.log(JSON.stringify(error));
                    console.log(handleErrors(error));
                });
            }
        });
    };
    Tasks.prototype.addNewTask = function () {
        var that = this;
        this._tasks.create({ 'Content': this._newTask, 'UserTask': newConfig.userToken, 'Completed': false }, function (data) {
            console.log(JSON.stringify(data));
            console.log("jkshjkshdjkvh");
            console.log(that._newTask);
            console.log(data.result.Id);
            that.itemsToLoad.push({ Content: that._newTask, Id: data.result.Id });
            that._tasksItems.length = that.itemsToLoad.length;
            that._tasksItems.loadSize = that.itemsToLoad.length;
            that._tasksItems.load(0, that.itemsToLoad);
            that.newTask = "";
        }, function (error) {
            console.log(JSON.stringify(error));
            console.log(handleErrors(error));
        });
    };
    Tasks.prototype.updateTask = function (complate, position, itemId) {
        var that = this;
        this._tasks.updateSingle({ Id: itemId, 'Completed': complate }, function (data) {
            that.itemsToLoad.splice(position, 1);
            that._tasksItems.length = that.itemsToLoad.length;
            that._tasksItems.loadSize = that.itemsToLoad.length;
            that._tasksItems.load(0, that.itemsToLoad);
        }, function (error) {
            console.log(JSON.stringify(error));
            console.log(handleErrors(error));
        });
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
    Object.defineProperty(Tasks.prototype, "newTask", {
        get: function () {
            return this._newTask;
        },
        set: function (value) {
            this._newTask = value;
            this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "newTask", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tasks.prototype, "done", {
        get: function () {
            return this._doneCheckBox;
        },
        set: function (value) {
            this._doneCheckBox = value;
            this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: "done", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tasks.prototype, "filterCompleted", {
        get: function () {
            return this._filterCompleted;
        },
        set: function (value) {
            this._filterCompleted = value;
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