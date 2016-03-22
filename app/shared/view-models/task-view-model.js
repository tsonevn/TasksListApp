"use strict";
var observable_1 = require("data/observable");
var config_1 = require("../config");
var newConfig = new config_1.Config();
var Task = (function (_super) {
    __extends(Task, _super);
    function Task(source) {
        _super.call(this);
        // this._content = tmpContent;
        // this._id = tmpId;
        this._source = source;
        if (this._source) {
            var property;
            for (property in this._source) {
                this.set(property, this._source[property]);
            }
        }
    }
    Object.defineProperty(Task.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    return Task;
}(observable_1.Observable));
exports.Task = Task;
//# sourceMappingURL=task-view-model.js.map