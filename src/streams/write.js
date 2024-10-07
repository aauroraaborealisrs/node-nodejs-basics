import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    
    const writableStream = createWriteStream(filePath, { encoding: 'utf-8' });

    console.log('Enter text to write to the file (press Ctrl+C to complete input):');
    
    process.stdin.on('data', (chunk) => {
        writableStream.write(chunk.toString().trim() + '\n');  
    });

    process.stdin.on('end', () => {
        writableStream.end();
    });

    writableStream.on('error', (err) => {
        console.error('Error writing to file:', err);
    });
};

await write();