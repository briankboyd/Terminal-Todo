
interface IFileAccess {
    getFilePath(): string;
    setFilePath(file: string);
    readFile(callback:Function);
    createFile();
    updateFile(contents:string);
}
