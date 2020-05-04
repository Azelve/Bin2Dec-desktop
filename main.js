const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: false,
    resizable: false,
    icon: __dirname + "/src/assets/images/binary.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  let child = new BrowserWindow({
    width: 1000,
    height: 800,
    parent: win,
    transparent: true,
    modal: true,
    show: false,
    icon: __dirname + "/src/assets/images/mirror.png",
  });

  child.once("ready-to-show", () => child.show());
  child.loadURL("https://instagram.com/espelhoinvertido");

  // INSTAGRAM WINDOW
  win.webContents.on("new-window", (event, url, frameName) => {
    if (frameName === "Espelho Invertido") {
      // open window as modal
      event.preventDefault();
      // Object.assign(options, {
      const mirrorWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        parent: win,
        transparent: true,
        modal: true,
        frame: true,
        resizable: false,
        show: false,
        icon: __dirname + "/src/assets/images/mirror.png",
      });

      mirrorWindow.once("ready-to-show", () => mirrorWindow.show());
      mirrorWindow.loadURL(url);
      event.newGuest = mirrorWindow.setTitle(`${frameName}`);

      // ERROR WINDOW
    } else if (frameName === "Error") {
      event.preventDefault();

      const errorWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        parent: win,
        modal: true,
        frame: false,
        show: false,
        icon: __dirname + "/src/assets/images/error.png",
        webPreferences: {
          nodeIntegration: true,
        },
      });

      errorWindow.once("ready-to-show", () => errorWindow.show());
      errorWindow.loadFile(__dirname + "/src/pages/Error/index.html");
      event.newGuest = errorWindow.setTitle(`${frameName}`);
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(__dirname + "/src/pages/Home/index.html");
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
