import { WebSocketInitialMessage } from '../../types'
import { WsMessageTypes } from '../../enums'
import { cleanSubdomain, wsSendMessage } from '../../utils'
import { StartCommandArguments } from '../../commands'
import { wsClosedListener } from './wsClosedListener'
import { CustomWebSocket } from '../customWebsocket'
import { getApiKey } from '../../storage'

export const wsOpenListener =
    (
        websocket: CustomWebSocket,
        { domain, apiKey, basicAuth }: Pick<StartCommandArguments, 'domain' | 'apiKey' | 'basicAuth'>
    ) =>
        () => {
            const wsMessage: WebSocketInitialMessage = {
                apiKey: apiKey ?? getApiKey(),
                type: WsMessageTypes.INITIAL_REQUEST,
                subdomain: cleanSubdomain(domain),
                basicAuth,
            }

            wsSendMessage<WebSocketInitialMessage>(websocket, wsMessage)

            websocket.on('close', wsClosedListener)
        }
