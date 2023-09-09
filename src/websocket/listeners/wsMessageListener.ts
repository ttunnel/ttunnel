import { cyan, green } from 'colors/safe'
import { StartCommandArguments } from '../../commands'
import { WsMessageTypes } from '../../enums'
import {
    WebSocketMessage,
    WebSocketHostnameAssignedMessage,
    WebSocketRequestMessage,
    WebSocketErrorMessage,
} from '../../types'
import { isJsonString, log } from '../../utils'
import {
    wsHostnameAssignedAction,
    wsRequestMessageAction,
    wsErrorAction
} from '../actions'
import { CustomWebSocket } from '../customWebsocket'

export const wsMessageListener =
    (
        websocket: CustomWebSocket,
        { port, hostname }: StartCommandArguments
    ) =>
        (content: string) => {
            const message = isJsonString(content) as WebSocketMessage<WsMessageTypes>

            if (!message) return
            if (!message.type) return

            log(`${green('recevied')} > ${cyan(message.type.toUpperCase())}\n`)

            // Handle every message type.
            switch (message.type) {
                case WsMessageTypes.ERROR_RESPONSE:
                    return wsErrorAction(
                        websocket,
                        message as WebSocketErrorMessage,
                    )
                case WsMessageTypes.HOSTNAME_ASSIGNED:
                    return wsHostnameAssignedAction(
                        websocket,
                        message as WebSocketHostnameAssignedMessage,
                        { port, hostname }
                    )
                case WsMessageTypes.REQUEST_MESSAGE:
                    return wsRequestMessageAction(
                        websocket,
                        message as WebSocketRequestMessage,
                        { port, hostname }
                    )
            }

            return
        }