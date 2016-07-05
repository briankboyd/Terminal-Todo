"use strict";
var Command_1 = require('./Command/Command');
var Todo_CLI = (function () {
    function Todo_CLI() {
    }
    Todo_CLI.prototype.main = function (args) {
        var command = new Command_1.Command();
        command
            .commandDelimiter('-')
            .command('add', 'adds an item to the todo list', function (inputParams) {
            console.log('add command entered');
            console.log(inputParams);
        })
            .process(args);
        //    command.args.forEach(val => {
        //        console.log(val);
        //    });             
    };
    return Todo_CLI;
}());
new Todo_CLI().main(process.argv);
