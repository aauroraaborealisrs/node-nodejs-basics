import { promises } from 'fs';
import { join } from 'path';

const list = async () => {
    const dirPath = join(process.cwd(), 'files');

    try {
        await promises.access(dirPath);
        const files = await promises.readdir(dirPath);
        console.log(files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();