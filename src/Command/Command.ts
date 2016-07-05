import {isEmpty} from '../Util/Util';

export class Command {
    private commands: CmdDef[] = [];
    private _args: string;
    private _commandDelimiter: string = '-';

    get args(): string {
        return this._args;
    }

    public command(command: string, usage: string, action: Function): Command {
        let cmdDef = {
            command: command,
            usage: usage,
            action: action
        }
        this.commands.push(cmdDef);
        return this;
    }

    public commandDelimiter(delimiter: string): Command {
        this._commandDelimiter = delimiter;
        return this;
    }

    public process(args: string[]): void {

        this._args = args.splice(2).join(' ');

        let cmdWithParams: CmdWithParams[] = [];
        if (this._args.length === 0 || this._args.charAt(0) !== this._commandDelimiter) {

            this.printUsage();
            process.exit(0);

        } else {

            let cmds = {
                command: this._args.substr(0, this._args.indexOf(' ')).substr(1),
                params: this._args.substr(this._args.indexOf(' ') + 1)
            }

            cmdWithParams.push(cmds);

            // Need to determine if all commands given by user are valid
            if (!this.validateInput(cmdWithParams)) {
                //if they aren't then display incorrect usage and then display usage
                //right now I'm not tracking the incorrect usage
                this.printUsage();
                process.exit(0);
            } else {
                //exectute commands
                this.commands.forEach(cmd => {
                    cmdWithParams.forEach(cmdInput => {
                        if (cmd.command === cmdInput.command) {
                            cmd.action(cmdInput.params);
                        }
                    });
                });


            }

        }
    }

    public printUsage() {
        this.commands.forEach(element => {
            console.log('Usage:');
            console.log(this._commandDelimiter + element.command + ' ' + element.usage);
        });
    }

    private validateInput(input: CmdWithParams[]): boolean {
        let filteredCmds: string[];

        this.commands.forEach((cmd) => {
            filteredCmds = this.filterOutValidCmds(input, cmd.command);
        });
        return filteredCmds.length === 0 ? true : false;
    }

    private filterOutValidCmds(originalArr: any[], elementToRemove: any) {
        return originalArr.filter(function (el) { return el.command !== elementToRemove });
    }

}

interface CmdDef {
    command: string;
    usage: string;
    action: Function;
}

interface CmdWithParams {
    command: string;
    params: string;
}