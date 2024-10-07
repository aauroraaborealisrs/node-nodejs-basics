import { promises } from 'fs';
import { join } from 'path';

const remove = async () => {
    const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fileToRemove.txt'); 

    try {
        await promises.access(filePath); 
        await promises.unlink(filePath); 
        console.log('File deleted successfully!');
    } catch (error) {
        throw new Error('FS operation failed'); 
    }
};

await remove();