import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';
import { autoUpdater } from "electron-updater";

// Configure Auto-Updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

// ... (rest of imports)

ipcMain.handle('save-analysis', async (event, { fileName, md, txt, json }) => {
  try {
    const docsPath = 'C:\\My life\\Academics\\Entrance Test\\Entrance test preparation daily result from 21 April to 28 April';
    
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }

    fs.writeFileSync(path.join(docsPath, `${fileName}.json`), json);
    fs.writeFileSync(path.join(docsPath, `${fileName}.txt`), txt);
    fs.writeFileSync(path.join(docsPath, `${fileName}.md`), md);

    return { success: true, path: docsPath };
  } catch (error) {
    console.error('Save failed:', error);
    return { success: false, error: error.message };
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

// Auto-Updater Events
autoUpdater.on('update-available', () => {
  console.log('Update available. Downloading...');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded. Installing now...');
  autoUpdater.quitAndInstall();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1024,
    minHeight: 768,
    title: 'CET Engine 2026',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    backgroundColor: '#050A18',
    icon: path.join(__dirname, '../public/assets/icon.png')
  });

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Remove menu in production
  if (!isDev) {
    win.setMenu(null);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
