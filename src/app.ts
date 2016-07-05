
import {Command} from './Command/Command';

class Todo_CLI {

    public main(args: string[]): void {

        const command = new Command();
        command
            .commandDelimiter('-')
            .command('add', 'adds an item to the todo list', function (inputParams: string) {
                console.log('add command entered');
                console.log(inputParams);
            })
            .process(args);

        //    command.args.forEach(val => {
        //        console.log(val);

        //    });             
    }
}

new Todo_CLI().main(process.argv);