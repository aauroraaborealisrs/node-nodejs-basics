import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToWrite.txt'); 
    const writeStream = createWriteStream(filePath, 'utf8'); 
    process.stdin.pipe(writeStream); 

    writeStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });
};

await write();