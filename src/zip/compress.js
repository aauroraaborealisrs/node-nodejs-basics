import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const inputFilePath = join(__dirname, 'files', 'fileToCompress.txt'); 
    const outputFilePath = join(__dirname, 'files', 'archive.gz'); 

    const readStream = createReadStream(inputFilePath); 
    const writeStream = createWriteStream(outputFilePath); 

    const gzip = createGzip(); 

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File compressed successfully!');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
};

await compress();