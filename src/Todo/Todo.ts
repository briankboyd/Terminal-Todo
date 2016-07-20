import {FileAccess} from '../FileAccess/FileAccess';
import {getDate} from '../Util/Util';
export class Todo extends FileAccess {
    constructor(file: string) {
        super(file);
    }
    private space: string = '  |  ';
    addTodo = (todo: string): void => {
        this.updateFile('1' + this.space + todo + this.space + 'todo' + this.space + getDate() + FileAccess.EOL);
    }

    getTodos = (): void => {
        this.readFile();
    }
} 