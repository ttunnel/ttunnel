import { WebSocketInitialMessage } from '../../types'
import { WsMessageTypes } from '../../enums'
import { cleanSubdomain, wsSendMessage } from '../../utils'
import { StartCommandArguments } from '../../commands'
import { wsClosedListener } from './wsClosedListener'
import { CustomWebSocket } from '../customWebsocket'
import { getApiKey } from '../../storage'

export const wsOpenListener =
    (websocket: CustomWebSocket, { domain, apiKey }: Pick<StartCommandArguments, 'domain' | 'apiKey'>) =>
        () => {
            const wsMessage: WebSocketInitialMessage = {
                apiKey: apiKey ?? getApiKey(),
                type: WsMessageTypes.INITIAL_REQUEST,
                subdomain: cleanSubdomain(domain),
            }

            wsSendMessage<WebSocketInitialMessage>(websocket, wsMessage)

            websocket.on('close', wsClosedListener)
        }
