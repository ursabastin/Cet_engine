import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

// ... (rest of imports)

ipcMain.handle('save-analysis', async (event, { date, type, md, txt, json }) => {
  try {
    const docsPath = 'C:\\My life\\Academics\\Entrance Test\\Entrance test preparation daily result from 21 April to 28 April';
    
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }

    const baseName = `CET_${date}_Mock${type}_${Date.now()}`;
    
    fs.writeFileSync(path.join(docsPath, `${baseName}.md`), md);
    fs.writeFileSync(path.join(docsPath, `${baseName}.txt`), txt);
    fs.writeFileSync(path.join(docsPath, `${baseName}.json`), json);

    return { success: true, path: docsPath, fileName: baseName };
  } catch (error) {
    console.error('Failed to save analysis files', error);
    return { success: false, error: error.message };
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(os.tmpdir(), 'cet-engine-log.txt');
function log(msg) {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
}

log('App starting...');

function createWindow() {
  try {
    log('Creating window...');
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

    log(`__dirname: ${__dirname}`);
    const indexPath = isDev 
      ? 'http://localhost:5173' 
      : path.join(__dirname, '../dist/index.html');
    
    log(`Loading: ${indexPath}`);

    if (isDev) {
      win.loadURL(indexPath);
    } else {
      if (!fs.existsSync(indexPath)) {
        log(`ERROR: File not found: ${indexPath}`);
      }
      win.loadFile(indexPath).catch(err => {
        log(`Load failure: ${err.message}`);
      });
    }

    if (!isDev) {
      win.setMenu(null);
    }
    
    log('Window created successfully');
  } catch (err) {
    log(`CRITICAL ERROR in createWindow: ${err.message}\n${err.stack}`);
  }
}

app.whenReady().then(() => {
  log('App ready');
  createWindow();
}).catch(err => {
  log(`App ready failure: ${err.message}`);
});

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
