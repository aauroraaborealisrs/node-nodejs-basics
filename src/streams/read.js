import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    
    const readableStream = createReadStream(filePath, 'utf-8');
    
    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);  
    });

    readableStream.on('end', () => {
        console.log('\n');
    });

    readableStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await read();