import { promises } from 'fs';
import { join } from 'path';

const create = async () => {
    const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fresh.txt'); 

    try {
        await promises.access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
        await promises.writeFile(filePath, 'I am fresh and young', 'utf8'); 
        console.log('File created successfully!');
    }
};

await create();