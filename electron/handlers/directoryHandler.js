const fs = require('fs');
const path = require('path');

function listDirectoriesRecursive(dirPath) {
  const result = [];
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      const fullPath = path.join(dirPath, file.name);
      const children = listDirectoriesRecursive(fullPath);
      result.push({
        label: file.name,
        children: children.length ? children : undefined,
      });
    }
  }

  return result;
}

function registerDirectoryHandler(ipcMain) {
  ipcMain.handle('listar-diretorios', async () => {
    const baseDir = "/home/leonardo/viasoft";
    try {
      const directories = listDirectoriesRecursive(baseDir);
      return directories;
    } catch (err) {
      throw new Error(`Erro ao listar diretórios: ${err.message}`);
    }
  });
}

module.exports = { registerDirectoryHandler };