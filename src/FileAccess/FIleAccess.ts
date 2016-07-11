import * as fs from 'fs';
export abstract class FileAccess implements IFileAccess {

    constructor(file: string) {
        this.file = file;
    }
    private file: string;
    private encoding = 'utf8';


    getFilePath() {
        return this.file;
    }

    setFilePath(filePath: string) {
        this.file = filePath;
    }

    readFile(callback: Function): void {
        this.fileExists(() => {
            fs.readFile(this.file, this.encoding, (err, contents) => {
                if (!err) {
                    callback(contents);
                }
            });
        });

    }

    createFile() {
        this.fileExists(() => ({}));
    }

    public updateFile (contents:string) {
        this.fileExists(() => {
            fs.appendFile(this.file, contents, this.encoding, (err) => {
                if (err) {
                    throw err;
                }
            });
        });

    }

    private fileExists(callback: Function): void {
        fs.stat(this.file, (fileExistsErr, stats) => {
            if (fileExistsErr && fileExistsErr.errno === 34) {
                fs.writeFile(this.file, null, this.encoding, (creatFileErr) => {
                    if (creatFileErr) {
                        throw creatFileErr;
                    }
                });
            }
            callback();
        });
    }
}