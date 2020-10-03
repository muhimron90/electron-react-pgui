import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
let win = null;
let loadingScreen;
const isDev = !app.isPackaged;
const createLoadingScreen = () => {
   loadingScreen = new BrowserWindow(
     Object.assign({
       width: 360,
       height: 520,
       /// remove the window frame, so it will rendered without frames
       frame: false,
       /// and set the transparency to true, to remove any kind of background
       transparent: true,
       resizable: false,
       autoHideMenuBar: true,
     })
   );
  loadingScreen.loadURL(
    url.format({
      pathname: path.join(__dirname, './screens/Loading.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 360,
    height: 520,
    backgroundColor: '#ecf0f1',
    resizable: false,
    autoHideMenuBar: true,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  //  win.loadFile('index.html')
   win.loadURL(
     url.format({
       pathname: path.join(__dirname, './index.html'),
       protocol: 'file:',
       slashes: true,
     })
   );
  // win.loadFile(
  //   url.format({
  //     pathname: path.resolve(__dirname, './index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  //   })
  // );
  win.on('closed', function () {
    win = null;
  });
  win.webContents.on('did-finish-load', () => {
    /// when the content has loaded, hide the loading screen and show the main window
    if (loadingScreen) {
      loadingScreen.close();
    }
    win.show();
  });
}

app.on('ready', () => {
  createLoadingScreen();
  //add little time
  
  setTimeout(() => {
   
    createWindow();
    
  }, 1000);
  
})

// app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) createWindow();
});