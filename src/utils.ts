import { red } from 'colors'
import { cyan, gray } from 'colors/safe'
import { Spinner } from 'cli-spinner'
import { IncomingHttpHeaders } from 'http'
import Debug from 'debug'
import { CustomWebSocket } from './websocket/customWebsocket'
import { KeyValuePair } from './commands/types'

interface Omit {
    // eslint-disable-next-line @typescript-eslint/ban-types
    <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
        [K2 in Exclude<keyof T, K[number]>]: T[K2]
    }
}

export const isFunction = (value: any): boolean => typeof value === 'function'

export const isObject = (value: any): boolean => typeof value === 'object'

export const isArray = (value: any): boolean => Array.isArray(value)

export const isString = (value: any): boolean => typeof value === 'string'

export const isObjectOrArray = (value: any): boolean => {
    return isObject(value) || Array.isArray(value)
}

export const createDebug = Debug('ttunnel:client')

export const log = (msg: string = '', spinner: boolean = false) => {
    if (spinner) {
        const spinner = new Spinner(msg)

        spinner.setSpinnerString(18)
        spinner.start()

        return spinner
    }

    console.log(msg)
}

export const logCommand = (msg: string) => {
    log(`$ ${cyan(msg)}`)
}

export const displayError = (...lines: string[]) => {
    lines.forEach((line) => console.log(`${red('Error')} > ${gray(line)}`))
}

export const guessWebSocketServerHost =
    (endpoint: string): URL => new URL(endpoint)

export const cleanSubdomain = (domain: string | undefined): string | null => {
    if (!domain) return null

    const cleanedDomain = domain
        .replace('http://', '')
        .replace('https://', '')

    const domainParts = cleanedDomain.split('.')

    return domainParts[0] ?? null
}

export const isJsonString = (content: string): false | object => {
    try {
        return JSON.parse(content)
    } catch (e) {
        return false
    }
}

export const wsSendMessage = <T>(
    websocket: CustomWebSocket,
    message: T
) => {
    const json = JSON.stringify(message as T)
    websocket.send(json)
}

export const omit: Omit = (obj, ...keys) => {
    const ret = {} as {
        [K in keyof typeof obj]: (typeof obj)[K]
    }
    let key: keyof typeof obj

    for (key in obj) {
        if (!keys.includes(key)) {
            ret[key] = obj[key]
        }
    }

    return ret
}

export const removeHeaders = (
    headers: IncomingHttpHeaders,
    keys: string[]
): IncomingHttpHeaders => {
    keys.map(key => delete headers[key])

    return headers
}

export const solveGzipEncodingHeaders = (
    headers: IncomingHttpHeaders
): IncomingHttpHeaders => {
    delete headers['Accept-Encoding']
    delete headers['accept-encoding']

    return headers
}

export const mergeOrReplaceHeaders = (
    headers: IncomingHttpHeaders,
    newHeaders: KeyValuePair[]
): IncomingHttpHeaders => {
    for (const header of newHeaders) {
        headers[header.key] = header.value
    }

    return headers
}

export const parseUrl =
    (url: string | URL): string => typeof url === 'string' ? url : url.toString()
