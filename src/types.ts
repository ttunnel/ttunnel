import { WsMessageTypes } from './enums'
import { IncomingHttpHeaders } from 'http'
import { BasicAuth } from './commands'

export type WebSocketMessage<T> = {
    type: T
}

export type WebSocketErrorMessage = {
    error: string
} & WebSocketMessage<WsMessageTypes.ERROR_RESPONSE>

export type WebSocketInitialMessage = {
    apiKey: string
    subdomain?: string | null
    basicAuth?: BasicAuth
} & WebSocketMessage<WsMessageTypes.INITIAL_REQUEST>

export type WebSocketHostnameAssignedMessage = {
    hostname: string
    connectionId: string
} & WebSocketMessage<WsMessageTypes.HOSTNAME_ASSIGNED>

export type WebSocketRequestMessage = {
    requestId: string
    url: URL | string
    method: string
    headers: IncomingHttpHeaders
    body: string
} & WebSocketMessage<WsMessageTypes.REQUEST_MESSAGE>

export type WebSocketResponseMessage = {
    requestId: string
    url: string
    statusCode?: number
    headers: IncomingHttpHeaders
    body: string
} & WebSocketMessage<WsMessageTypes.RESPONSE_MESSAGE>