import {app, BrowserWindow, shell} from "electron";
const remoteMain = require("@electron/remote/main");

remoteMain.initialize();

// Instant window rendering initialization
app.disableHardwareAcceleration();

const isDevelopment = process.env.NODE_ENV !== "production";
app.name = "Midnightcord";

let mainWindow;

function createMainWindow() {
    const window = new BrowserWindow({
        title: "Midnightcord Installer",
        frame: false,
        width: 550,
        height: 350,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        backgroundColor: "#0c0d10",
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    remoteMain.enable(window.webContents);

    if (isDevelopment) window.webContents.openDevTools({mode: "detach"});
    window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    window.once("ready-to-show", () => {
        window.show();
        window.focus();
    });

    window.on("closed", () => {
        mainWindow = null;
    });

    window.webContents.setWindowOpenHandler(({url}) => {
        shell.openExternal(url);
        return {action: "deny"};
    });

    return window;
}

app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
});

app.on("activate", () => {
    if (mainWindow !== null) return;
    mainWindow = createMainWindow();
});

app.on("ready", async () => {
    mainWindow = createMainWindow();
    // Run update check in background asynchronously without blocking UI startup
    setTimeout(() => {
        if (!process.env.BD_SKIP_UPDATECHECK) {
            import("./update_installer").then(m => m.default?.()).catch(() => {});
        }
    }, 2000);
});
