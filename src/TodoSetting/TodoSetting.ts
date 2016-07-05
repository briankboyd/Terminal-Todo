import {FileAccess} from '../FileAccess/FileAccess';
const settings = require('../todoSettings');

export class TodoSetting extends FileAccess implements ITodoSetting {


    getTodoSettings():string {
       return settings;
    }
}