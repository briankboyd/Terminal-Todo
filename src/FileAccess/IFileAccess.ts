
interface IFileAccess {
    getFilePath(): string;
    setFilePath(file: string);
    readFile();
    createFile();
    updateFile();
}
