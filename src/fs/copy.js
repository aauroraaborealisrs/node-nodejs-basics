import { promises } from 'fs';
import { join } from 'path';

const copy = async () => {
    const srcDir = join(process.cwd(), 'src', 'fs', 'files'); 
    const destDir = join(process.cwd(), 'src', 'fs', 'files_copy'); 

    try {
        await promises.access(srcDir); 

        try {
            await promises.access(destDir); 
            throw new Error('FS operation failed'); 
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error; 
            }
        }

        await promises.mkdir(destDir); 
        const files = await promises.readdir(srcDir); 

        for (const file of files) {
            const srcFile = join(srcDir, file); 
            const destFile = join(destDir, file); 
            await promises.copyFile(srcFile, destFile); 
        }

        console.log('Folder copied successfully!');
    } catch (error) {
        console.error(error.message);
    }
};

await copy();
