"use strict";
var Command = (function () {
    function Command() {
        this.commands = [];
        this._commandDelimiter = '-';
    }
    Object.defineProperty(Command.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    Command.prototype.command = function (command, usage, action) {
        var cmdDef = {
            command: command,
            usage: usage,
            action: action
        };
        this.commands.push(cmdDef);
        return this;
    };
    Command.prototype.commandDelimiter = function (delimiter) {
        this._commandDelimiter = delimiter;
        return this;
    };
    Command.prototype.process = function (args) {
        this._args = args.splice(2).join(' ');
        var cmdWithParams = [];
        if (this._args.length === 0 || this._args.charAt(0) !== this._commandDelimiter) {
            this.printUsage();
            process.exit(0);
        }
        else {
            var cmds = {
                command: this._args.substr(0, this._args.indexOf(' ')).substr(1),
                params: this._args.substr(this._args.indexOf(' ') + 1)
            };
            cmdWithParams.push(cmds);
            // Need to determine if all commands given by user are valid
            if (!this.validateInput(cmdWithParams)) {
                //if they aren't then display incorrect usage and then display usage
                //right now I'm not tracking the incorrect usage
                this.printUsage();
                process.exit(0);
            }
            else {
                //exectute commands
                this.commands.forEach(function (cmd) {
                    cmdWithParams.forEach(function (cmdInput) {
                        if (cmd.command === cmdInput.command) {
                            cmd.action(cmdInput.params);
                        }
                    });
                });
            }
        }
    };
    Command.prototype.printUsage = function () {
        var _this = this;
        this.commands.forEach(function (element) {
            console.log('Usage:');
            console.log(_this._commandDelimiter + element.command + ' ' + element.usage);
        });
    };
    Command.prototype.validateInput = function (input) {
        var _this = this;
        var filteredCmds;
        this.commands.forEach(function (cmd) {
            filteredCmds = _this.filterOutValidCmds(input, cmd.command);
        });
        return filteredCmds.length === 0 ? true : false;
    };
    Command.prototype.filterOutValidCmds = function (originalArr, elementToRemove) {
        return originalArr.filter(function (el) { return el.command !== elementToRemove; });
    };
    return Command;
}());
exports.Command = Command;
