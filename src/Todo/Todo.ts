import {FileAccess} from '../FileAccess/FileAccess';
import {getDate} from '../Util/Util';
export class Todo extends FileAccess {
    constructor(file: string) {
        super(file);
    }
    private space: string = '  |  ';
    private formatMe: FormatMe = {
        id: 8,
        description: 128,
        status: 8,
        timestamp: 22,
        spacing: 4,
        delimiter: '|'
    }
    addTodo = (todo: string): void => {
        this.updateFile('1' + this.space + todo + this.space + 'todo' + this.space + getDate() + FileAccess.EOL);
    }

    getTodos = (): void => {
        this.readFile(FileAccess.log);
    }
}

interface FormatMe {
    id: number;
    description: number;
    status: number;
    timestamp: number;
    spacing: number;
    delimiter: any;

}