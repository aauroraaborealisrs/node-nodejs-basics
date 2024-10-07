import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const inputFilePath = join(__dirname, 'files', 'archive.gz'); 
    const outputFilePath = join(__dirname, 'files', 'fileToCompress.txt'); 

    const readStream = createReadStream(inputFilePath); 
    const writeStream = createWriteStream(outputFilePath); 

    const gunzip = createGunzip(); 
    
    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File decompressed successfully!');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
};

await decompress();