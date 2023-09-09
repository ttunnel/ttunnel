import { WebSocket as BaseWebSocket } from 'ws'

export class WebSocket extends BaseWebSocket {
    sendMessage(object: unknown) {
        const json = JSON.stringify(object)
        this.send(json)
    }
}