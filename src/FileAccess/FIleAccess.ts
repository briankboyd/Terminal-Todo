import * as fs from 'fs';
export abstract class FileAccess implements IFileAccess {
    
    private file: string;
    
    
    getFilePath()  {
        return this.file;
    }
    
    setFilePath() {
        
    }
    
    readFile() {
        
    }
    
    createFile() {
        
    }
    
    updateFile() {
        
    }
}