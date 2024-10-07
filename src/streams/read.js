import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url); 
    const __dirname = dirname(__filename); 
    const filePath = join(__dirname, 'files', 'fileToRead.txt'); 
    const stream = createReadStream(filePath, 'utf8');
    stream.pipe(process.stdout); 
    stream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
};

await read();