import * as path from 'path';
import {Command} from './Command/Command';
import {Todo} from './Todo/Todo';

class Todo_CLI {

    public main(args: string[]): void {
        const appDir = path.dirname(require.main.filename);
        let fileName = '/todos.txt';
        const file: string = appDir + fileName;
        const todo = new Todo(file);
        const command = new Command();

        command
            .commandDelimiter('-')
            .command('add', 'adds an item to the todo list', todo.addTodo)
            .command('list', 'displays the todos', todo.getTodos)
            .process(args);
    }
}
  
new Todo_CLI().main(process.argv);