import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url';
import connectionToDataBase from './backend/mongo/mongo.ts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    await win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
}

app.whenReady().then(async () => {
    createWindow();
    await connectionToDataBase();

    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});