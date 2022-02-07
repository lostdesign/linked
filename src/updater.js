import { dialog, Notification } from 'electron'
import { autoUpdater } from 'electron-updater'
import { DAILY, WEEKLY } from '@/background'

autoUpdater.autoDownload = false

// autoUpdater.allowPrerelease = GET FROM STORE IF TRUE
// autoUpdater.allowDowngrade = PROBABLY SHOULD BE TRUE, BUT HOW DOES IT WORK

autoUpdater.on('update-available', async (updateInfo) => {
  const { response } = await dialog.showMessageBox({
    title: 'Update available',
    message: `Version ${updateInfo.version} is available, would you like to update now?`,
    detail: 'The app will download the update and restart once finished.',
    type: 'question',
    buttons: ['Remind me later', 'Install'],
    defaultId: 1,
    noLink: true
  })
  if (response === 1) {
    global.storage.set('updateInterval', DAILY)
    await autoUpdater.downloadUpdate()
  } else {
    global.storage.set('updateInterval', WEEKLY)
  }
})
autoUpdater.on('update-not-available', async () => {
  await new Notification({
    title: 'No updates',
    body: 'You are already on the latest version of linked'
  }).show()
})
autoUpdater.on('update-downloaded', async () => {
  autoUpdater.quitAndInstall()
})

const askForUpdates = async () => {
  if (!global.storage.get('enableUpdates')) return
  await autoUpdater.checkForUpdates()
}

const setupUpdates = () => {
  if (parseInt(global.storage.get('updateInterval')) === DAILY) {
    askForUpdates()
  }
  setInterval(() => askForUpdates(), global.storage.get('updateInterval'))
}

export default { setupUpdates, askForUpdates }
