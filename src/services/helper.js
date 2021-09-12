import { app as backendApp, remote } from 'electron'

function getApp() {
  if (backendApp) {
    return backendApp
  }
  if (remote) {
    return remote.app
  }

  return null
}

export const app = getApp()

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV !== 'production'
export const isWindows = process.platform === 'win32'
export const isMacOS = process.platform === 'darwin'
