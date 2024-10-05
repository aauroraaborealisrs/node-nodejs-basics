import { promises } from 'fs';
import { join } from 'path';

const read = async () => {
    const filePath = join(process.cwd(), 'files', 'fileToRead.txt');

    try {
        await promises.access(filePath);
        const content = await promises.readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await read();