"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FileAccess_1 = require('../FileAccess/FileAccess');
var settings = require('../todoSettings');
var TodoSetting = (function (_super) {
    __extends(TodoSetting, _super);
    function TodoSetting() {
        _super.apply(this, arguments);
    }
    TodoSetting.prototype.getTodoSettings = function () {
        return settings;
    };
    return TodoSetting;
}(FileAccess_1.FileAccess));
exports.TodoSetting = TodoSetting;
