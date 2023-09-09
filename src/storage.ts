import fs from 'fs'
import os from 'os'
import { LocalStorage } from 'node-localstorage'
import { StorageKeys } from './enums'

let storage: LocalStorage

export const initStorage = async () => {
    const homedir = os.homedir()
    const dir = `${homedir}/.ttunnel.sh`

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    storage = new LocalStorage(`${dir}/local-storage`)

    return storage
}

export const setClientId = (clientId: string) => storage.setItem(StorageKeys.CLIENT_ID, clientId)

export const removeClientId = () => storage.removeItem(StorageKeys.CLIENT_ID)

export const getClientId = () => storage.getItem(StorageKeys.CLIENT_ID)

export const getApiKey = () => storage.getItem(StorageKeys.API_KEY)

export const setApiKey = (apiKey: string) => storage.setItem(StorageKeys.API_KEY, apiKey)