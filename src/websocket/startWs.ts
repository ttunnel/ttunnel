import { CustomWebSocket } from './customWebsocket'
import { green, gray } from 'colors/safe'
import { guessWebSocketServerHost } from '../utils'
import { registerWsListeners } from './registerWsListeners'
import { StartCommandArguments } from '../commands/types'

export const startWs = ({ endpoint, domain, port, hostname, hostHeader }: StartCommandArguments): CustomWebSocket => {
    console.log(`${green('running')} > ${gray('remote websocket connection')}`)

    const websocket = new CustomWebSocket(guessWebSocketServerHost(endpoint))

    registerWsListeners(
        websocket,
        {
            port: Number(port),
            domain,
            hostname: hostname ?? '127.0.0.1',
            hostHeader: hostHeader ?? '',
        }
    )

    return websocket
}

export const ttunnel = startWs