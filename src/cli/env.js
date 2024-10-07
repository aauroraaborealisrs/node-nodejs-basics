import { promises } from 'fs';
import { join, dirname } from 'path';

const parseEnv = () => {
    let dir = process.cwd();

    const findEnvFile = () => {
        const envFilePath = join(dir, '.env');

        promises.access(envFilePath)
            .then(() => {
                return promises.readFile(envFilePath, 'utf8');
            })
            .then(envContent => {
                const envVariables = envContent.split('\n')
                    .filter(line => line.startsWith('RSS_'))
                    .map(line => line.trim().replace(/\s+/g, ''))
                    .map(line => line.replace('=', '='))
                    .join('; ');

                console.log(envVariables);
            })
            .catch(error => {
                const parentDir = dirname(dir);
                if (parentDir === dir) {
                    console.error('Error: .env file not found');
                    return;
                }
                dir = parentDir;
                findEnvFile(); 
            });
    };

    findEnvFile();
};

parseEnv();