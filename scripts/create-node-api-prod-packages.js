import { readFileSync, writeFileSync, mkdirSync } from 'fs';

function createProductionPackage() {
  const devPackagePath = 'node-api/package.json';
  const devPackage = JSON.parse(readFileSync(devPackagePath, 'utf8'));
  
  const prodPackage = {
    ...devPackage,
    dependencies: {
      ...devPackage.dependencies,
      '@my-site/shared': 'file:./shared'
    }
  };
  
  mkdirSync('dist/node-api', { recursive: true });
  
  writeFileSync(
    'dist/node-api/package.json', 
    JSON.stringify(prodPackage, null, 2)
  );
}

createProductionPackage();