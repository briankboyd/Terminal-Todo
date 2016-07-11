import {FileAccess} from '../FileAccess/FileAccess';
export class ManageTodo extends FileAccess {
    constructor(file: string) {
        super(file);
    }

    addTodo = (todo: string): void  => {
        this.updateFile(todo); //not available when called via callback, scoping issue        
    }

    getTodos = ():void => {
        this.readFile(() => console.log);
    }
}