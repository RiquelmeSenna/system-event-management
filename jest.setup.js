import { execSync } from 'child_process';

process.env.NODE_ENV = 'test';

// Rodar as migrações antes dos testes
execSync('npm run migrate:test', { stdio: 'inherit' });