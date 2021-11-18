import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

var updatesAvailableCurrently

// In ms
const UPDATE_CHECK_INTERVAL = 3_600_000 // 1h
const DIALOG_OPTS = {
    title: "Check for updates",
    message: "There's a Linked update available. Do you want to update?",
    type: "question",
    buttons: ["No", "OK"],
    defaultId: 1, // ok button
    noLink: true
}

async function askForUpdates() {
    const updateResult = await autoUpdater.checkForUpdates()
    if (updateResult) {
        const { response } = await dialog.showMessageBox(DIALOG_OPTS)
        if (response === 1) { //ok button has been clicked
            autoUpdater.downloadUpdate(updateResult.cancellationToken)
        }
    }
    updatesAvailableCurrently = updateResult !== undefined
}

function setupUpdates() {
    updatesAvailableCurrently = false
    setInterval(() => askForUpdates(), UPDATE_CHECK_INTERVAL)
}

export default { setupUpdates, askForUpdates, updatesAvailableCurrently }
