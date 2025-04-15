const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const connectDB = require("./src/db/config");
const User = require("./src/models/User");

// Connect to MongoDB
connectDB();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false, // Don't show the window until it's ready
  });
 win.setMenuBarVisibility(false);
  win.loadFile("src/index.html");

  // Maximize the window
  win.maximize();

  // Show the window when it's ready
  win.once("ready-to-show", () => {
    win.show();
  });

  // Uncomment the following line to open DevTools by default
  // win.webContents.openDevTools();
}

// Handle user registration
ipcMain.handle("register-user", async (event, userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Handle user login
ipcMain.handle("login-user", async (event, { email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (user.password !== password) {
      return { success: false, message: "Invalid password" };
    }
    return { success: true, message: "Login successful" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
