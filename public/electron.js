const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		frame: false, // removes the frame from the BrowserWindow. It is advised that you either create a custom menu bar or remove this line
		webPreferences: {
			// devTools: isDev, // toggles whether devtools are available. to use node write window.require('<node-name>')
			nodeIntegration: true, // turn this off if you don't mean to use node
			enableRemoteModule:true
		}
	})

	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/../build/index.html`);

	mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0)
			createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})