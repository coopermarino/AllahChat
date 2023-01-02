const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Message App',
        icon: path.join(__dirname, 'icon/allah.png')
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});

if (process.platform === 'win32')
{
    app.setAppUserModelId('Brothers In Allah')
}
