"use strict";
var Config = (function () {
    function Config() {
        this._AppID = "iam6bndxrued7vy0";
    }
    Config.prototype.invalidateToken = function () {
        Config._UserToken = "";
    };
    Object.defineProperty(Config.prototype, "userToken", {
        get: function () {
            return Config._UserToken;
        },
        set: function (tmpToken) {
            Config._UserToken = tmpToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "appID", {
        get: function () {
            return this._AppID;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
exports.Config = Config;
;
//# sourceMappingURL=config.js.map