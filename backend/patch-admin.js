const fs = require("fs");

////////////////////////////// utils /////////////////////////////

const findFilePathByNamePattern = (filePattern, fileExtension) => {
  const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Dashboard dist directory not found: ${dirPath}`);
    return null;
  }

  // Read the list of files in the directory
  const files = fs.readdirSync(dirPath);
  
  // Find the first file that matches the pattern
  const fileName = files.find(
    (file) => file.startsWith(filePattern) && file.endsWith(fileExtension)
  );
  
  if (!fileName) {
    console.log(`No file found matching pattern: ${filePattern}`);
    return null;
  }
  
  const filePath = `${dirPath}/${fileName}`;
  return filePath;
};

function findChunkFileByContainingText(text) {
  try {
    const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;
    
    if (!fs.existsSync(dirPath)) {
      console.log(`Dashboard dist directory not found: ${dirPath}`);
      return null;
    }

    // Read the list of files in the directory
    const files = fs.readdirSync(dirPath);

    // Filter out files that match the pattern chunk-*.mjs
    const targetFiles = files.filter(
      (file) => file.startsWith("chunk-") && file.endsWith(".mjs")
    );

    // Loop over the matching files and check their content
    for (const fileName of targetFiles) {
      const filePath = `${dirPath}/${fileName}`;
      const content = fs.readFileSync(filePath, "utf8");

      // If the file contains the target string, print its name
      if (content.includes(text)) {
        console.log(`Found '${text}' in file: ${filePath}`);
        return filePath;
      }
    }
    
    console.log(`No chunk file found containing: ${text}`);
    return null;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

const readFileAsLines = (filePath) => {
  // Read the file content
  let fileContent = fs.readFileSync(filePath, "utf8");
  
  // Split the file into lines
  const lines = fileContent.split("\n");
  
  return lines;
};

const replaceInFile = (filePath, searchValue, replaceValue) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(new RegExp(searchValue, 'g'), replaceValue);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated ${filePath}: ${searchValue} -> ${replaceValue}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
};

const writeFile = (lines, filePath) => {
  try {
    // Write the modified content back to the file
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`Updated ${filePath} successfully.`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};

////////////////////////////// main customizations /////////////////////////////

console.log("Starting Al Shabaab Fabrics admin dashboard customization...");

// 1) Welcome to Medusa -> Welcome to Al Shabaab Fabrics
console.log("1. Updating welcome message...");
const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
if (CHUNK_1) {
  replaceInFile(CHUNK_1, "Welcome to Medusa", "Welcome to Al Shabaab Fabrics");
}

// 2) Update any other Medusa branding references
console.log("2. Updating branding references...");
const CHUNK_2 = findChunkFileByContainingText("Medusa Admin");
if (CHUNK_2) {
  replaceInFile(CHUNK_2, "Medusa Admin", "Al Shabaab Fabrics Admin");
}

// 3) Try to update page title
console.log("3. Looking for page title references...");
const APP_MJS_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
if (fs.existsSync(APP_MJS_PATH)) {
  replaceInFile(APP_MJS_PATH, "Medusa", "Al Shabaab Fabrics");
}

// 4) Look for any login-specific files to customize
console.log("4. Customizing login page...");
const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
if (LOGIN_PATH) {
  replaceInFile(LOGIN_PATH, "Welcome to Medusa", "Welcome to Al Shabaab Fabrics");
  replaceInFile(LOGIN_PATH, "Medusa", "Al Shabaab Fabrics");
}

// 5) Try to update the main index file
console.log("5. Updating main index file...");
const INDEX_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/index.html`;
if (fs.existsSync(INDEX_PATH)) {
  replaceInFile(INDEX_PATH, "<title>Medusa</title>", "<title>Al Shabaab Fabrics Admin</title>");
  replaceInFile(INDEX_PATH, "Medusa", "Al Shabaab Fabrics");
}

// 6) Clear Vite cache to ensure changes are visible
console.log("6. Clearing cache...");
const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
if (fs.existsSync(VITE_CACHE_PATH)) {
  fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
  console.log("Vite cache cleared successfully.");
}

// Alternative cache paths
const ALT_CACHE_PATHS = [
  `${__dirname}/node_modules/.vite`,
  `${__dirname}/.medusa/server/node_modules/.vite`,
  `${__dirname}/.vite`
];

ALT_CACHE_PATHS.forEach(cachePath => {
  if (fs.existsSync(cachePath)) {
    try {
      fs.rmSync(cachePath, { recursive: true, force: true });
      console.log(`Cleared cache at: ${cachePath}`);
    } catch (error) {
      console.log(`Could not clear cache at ${cachePath}:`, error.message);
    }
  }
});

console.log("✅ Al Shabaab Fabrics admin customization completed!");
console.log("Please restart your Medusa server to see the changes."); 