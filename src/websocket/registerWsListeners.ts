import {
    wsConnectionListener,
    wsMessageListener,
    wsErrorListener,
    wsOpenListener,
} from './listeners'
import { omit } from '../utils'
import { StartCommandArguments } from '../commands'
import { CustomWebSocket } from './customWebsocket'

export const registerWsListeners = (
    websocket: CustomWebSocket,
    startCommandArgs: StartCommandArguments
) => {
    websocket.on('connection', wsConnectionListener)

    if (websocket.readyState === 1) {
        wsOpenListener(websocket, omit(startCommandArgs, 'port'))
    } else {
        websocket.on('open', wsOpenListener(websocket, omit(startCommandArgs, 'port')))
    }

    websocket.on('message', wsMessageListener(websocket, startCommandArgs))
    websocket.on('error', wsErrorListener(startCommandArgs))
}