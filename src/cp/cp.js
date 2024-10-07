import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename); 

    const scriptPath = join(__dirname, 'files', 'script.js'); 

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe']
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess(['first', 'second']);
