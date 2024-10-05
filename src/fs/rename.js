import { promises } from 'fs';
import { join } from 'path';

const rename = async () => {
    const srcFile = join(process.cwd(), 'files', 'wrongFilename.txt');
    const destFile = join(process.cwd(), 'files', 'properFilename.md');

    try {

        try {
            await promises.access(srcFile);
        } catch (error) {
            
            throw new Error('FS operation failed');
        }

        try {
            await promises.access(destFile);
            throw new Error('FS operation failed'); 
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error; 
            }
        }

        await promises.rename(srcFile, destFile);
        console.log('File renamed successfully!');
        
    } catch (error) {
        console.error(error.message);
    }
};

await rename();