import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const calculateHash = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        const result = hash.digest('hex');
        console.log(`SHA256 hash: ${result}`);
    });

    stream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
};

await calculateHash();