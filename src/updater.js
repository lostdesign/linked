import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

var updatesAvailableCurrently

const DIALOG_OPTS = {
    title: "Check for updates",
    message: "There's a Linked update available. Do you want to update?",
    type: "question",
    buttons: ["No", "OK"],
    defaultId: 1, // ok button
    noLink: true
}

autoUpdater.autoDownload = false

autoUpdater.on('update-available', async () => {
    const { response } = await dialog.showMessageBox(DIALOG_OPTS)
    if (response === 1) { //ok button has been clicked
        autoUpdater.downloadUpdate()
    }
})
autoUpdater.on('update-not-available', () => {
    await dialog.showMessageBox({
        title: 'Updates not available',
        message: "There isn't any update available. Sorry :(",
        buttons: ["OK"]
    })
})
autoUpdater.on('update-downloaded', async () => {
    autoUpdater.quitAndInstall()
})

async function askForUpdates() {
    if (!global.storage.get("enableUpdates")) return
    await autoUpdater.checkForUpdates()
}

function setupUpdates() {
    setInterval(() => askForUpdates(), global.storage.get("updateInterval"))
}

export default { setupUpdates, askForUpdates }
