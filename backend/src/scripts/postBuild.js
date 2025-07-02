const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const MEDUSA_SERVER_PATH = path.join(process.cwd(), '.medusa', 'server');

// Check if .medusa/server exists - if not, build process failed
if (!fs.existsSync(MEDUSA_SERVER_PATH)) {
  throw new Error('.medusa/server directory not found. This indicates the Medusa build process failed. Please check for build errors.');
}

// Copy package-lock.json instead of pnpm-lock.yaml
const lockfilePath = path.join(process.cwd(), 'package-lock.json');
if (fs.existsSync(lockfilePath)) {
  fs.copyFileSync(
    lockfilePath,
    path.join(MEDUSA_SERVER_PATH, 'package-lock.json')
  );
  console.log('Copied package-lock.json to .medusa/server');
} else {
  console.warn('package-lock.json not found, skipping lockfile copy');
}

// Copy .env if it exists
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.copyFileSync(
    envPath,
    path.join(MEDUSA_SERVER_PATH, '.env')
  );
  console.log('Copied .env to .medusa/server');
}

// Install dependencies using npm
console.log('Installing dependencies in .medusa/server...');
execSync('npm ci --omit=dev', { 
  cwd: MEDUSA_SERVER_PATH,
  stdio: 'inherit'
});
