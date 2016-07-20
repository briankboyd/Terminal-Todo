
export class Command {
    private _commands: CmdDef[] = [];
    private _args: string;
    private _commandDelimiter: string = '-';
    private _inputCommand;
    private _inputParams;

    get args(): string {
        return this._args;
    }

    public command(command: string, usage: string, action: Function): Command {
        let cmdDef = {
            command: this._commandDelimiter + command,
            usage: usage,
            action: action,
            params: null,
            fireAction: null
        }
        this._commands.push(cmdDef);
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

        } else {
            const input = this._args.split(/^([\w\-]+)/).filter(Boolean);
            const cmds = {
                command: input[0],
                params: input[1] === undefined ? null : input[1].trim()
            }
            cmdWithParams.push(cmds);

            if (!this.validateInput(cmdWithParams)) {
                this.printUsage();
            } else {
                this._commands.forEach(cmd => {
                    if (cmd.fireAction) {
                        cmd.action(cmd.params);
                    }
                });
            }
        }
    }

    public printUsage() {
        console.log('Usage:');
        this._commands.forEach(element => {
            console.log(this._commandDelimiter + element.command + ' ' + element.usage);
        });
        process.exit();
    }

    private validateInput(input: CmdWithParams[]): boolean {
        let countValidCmds:number = 0;
        try {
            for (let i = 0; i < input.length; i++) {
                for(let j = 0; j < this._commands.length;  j++) {
                    if (input[i].command === this._commands[j].command) {
                        countValidCmds++;
                        this._commands[j].params = input[i].params;
                        this._commands[j].fireAction = true;
                    }

                }
                return countValidCmds === input.length;
            }
        } catch (error) {
            this.printUsage();
        }
    }
}

interface CmdDef {
    command: string;
    usage: string;
    action: Function;
    params?: string;
    fireAction?: boolean;
}

interface CmdWithParams {
    command: string;
    params: string;
}