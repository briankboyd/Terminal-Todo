
import {Command} from './Command/Command';
import {ManageTodo} from './ManageToDo/ManageToDo';
class Todo_CLI {

    public main(args: string[]): void {
        let file:string = './todos.txt';
        const manageToDo = new ManageTodo(file);
        const command = new Command();
        command
            .commandDelimiter('-')
            .command('add', 'adds an item to the todo list', manageToDo.addTodo)
            .process(args);          
    }
}

new Todo_CLI().main(process.argv);