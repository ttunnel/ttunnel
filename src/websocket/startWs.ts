import { CustomWebSocket } from './customWebsocket'
import { green, gray } from 'colors/safe'
import { guessWebSocketServerHost, isString, isArray } from '../utils'
import { registerWsListeners } from './registerWsListeners'
import { RawStartCommandArguments, StartCommandArguments, BasicAuth, KeyValuePair } from '../commands/types'

export const startWs = (args: RawStartCommandArguments): CustomWebSocket => {
    console.log(`${green('running')} > ${gray('remote websocket connection')}`)

    const websocket = new CustomWebSocket(guessWebSocketServerHost(args.endpoint))

    registerWsListeners(
        websocket,
        transformRawCommandArguments(args)
    )

    return websocket
}

const transformRawCommandArguments = (args: RawStartCommandArguments): StartCommandArguments => {
    return {
        port: Number(args.port),
        endpoint: args.endpoint ?? 'ws://ttunnel.me:4000',
        domain: args.domain,
        hostname: args.hostname ?? '127.0.0.1',
        hostHeader: args['host-header'] ?? '',
        basicAuth: transformRawBasicAuth(args['basic-auth']),
        requestHeaderAdd: transformRawKeyValuePairs(args['request-header-add']),
        requestHeaderRemove: transformSingleValueToArray(args['request-header-remove']),
        responseHeaderAdd: transformRawKeyValuePairs(args['response-header-add']),
        responseHeaderRemove: transformSingleValueToArray(args['response-header-remove']),
    }
}

const transformRawBasicAuth = (basicAuth: string | string[]): BasicAuth | undefined => {
    const basicAuthStr = (Array.isArray(basicAuth) ? basicAuth[0] : basicAuth)

    if (!basicAuthStr || !isString(basicAuth)) return undefined

    const basicAuthParts = basicAuthStr.split(':')

    return basicAuthParts.length <= 2 ? {
        user: basicAuthParts[0],
        pass: basicAuthParts[1]
    } : undefined
}

const transformSingleValueToArray = (content: any | any[]) => !isArray(content) ? [content] : content

const transformRawKeyValuePairs = (content: string | string[]): KeyValuePair[] => {
    const stringList = typeof content === 'string' ? [content] : content

    if (!stringList || !stringList.length) return []

    const transformedValue: KeyValuePair[] = []

    for (const header of stringList) {
        if (!header || !isString(header)) continue

        const parts = header.split(':')

        if (!parts || parts.length < 2) continue

        transformedValue.push({ key: parts[0] as string, value: parts[1] as string })
    }

    return transformedValue
}

export const ttunnel = startWs