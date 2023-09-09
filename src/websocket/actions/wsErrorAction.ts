import { WebSocketErrorMessage } from '../../types'
import { displayError } from '../../utils'
import { CustomWebSocket } from '../customWebsocket'

export const wsErrorAction = (websocket: CustomWebSocket, message: WebSocketErrorMessage) => {
    if (message.error) displayError(message.error)

    websocket.terminate()
}