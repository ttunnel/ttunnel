import http, {
    IncomingHttpHeaders,
    IncomingMessage,
} from 'http'
import { wsSendMessage, mergeOrReplaceHeaders, solveGzipEncodingHeaders, displayError } from '../../utils'
import { StartCommandArguments } from '../../commands'
import { WebSocketRequestMessage, WebSocketResponseMessage } from '../../types'
import { WsMessageTypes } from '../../enums'
import pkg from '../../pkg'
import { CustomWebSocket } from '../customWebsocket'

export const wsRequestMessageAction = (
    websocket: CustomWebSocket,
    message: WebSocketRequestMessage,
    { port, hostname, hostHeader }: Pick<StartCommandArguments, 'port' | 'hostname' | 'hostHeader'>
) => {
    const { url, requestId, method, headers, body } = message

    if (!url) return

    const via = `1.1 ${hostname} (proxy/${pkg.version})`

    const request = http.request(
        {
            hostname: 'localhost',
            path: parseUrl(url),
            port,
            method,
            headers:
                mergeOrReplaceHeaders(
                    solveGzipEncodingHeaders(headers),
                    [
                        { key: 'Host', value: hostHeader ?? (hostname as string) },
                        { key: 'via', value: via }
                    ]
                ),
        },
        (response: IncomingMessage) => {
            let responseBody: Buffer | null = null

            response.on('data', (chunk: Buffer) => {
                responseBody
                    ? responseBody = Buffer.concat([responseBody, chunk])
                    : responseBody = chunk
            })

            response.on('end', () => {
                wsSendMessage(
                    websocket,
                    createResponseWsMessage(
                        response.statusCode,
                        response.headers,
                        responseBody,
                        { url, requestId }
                    )
                )
            })
        }
    )

    const reqBody: Buffer | string = typeof body === 'string' ? Buffer.from(body, 'base64') : ''

    request.write(reqBody)

    request.on('error', (error) => {
        displayError(error.message)
    })

    request.end()
}

const createResponseWsMessage = (
    statusCode: number | undefined,
    headers: IncomingHttpHeaders,
    responseBody: Buffer | null,
    { url, requestId }: Pick<WebSocketRequestMessage, 'url' | 'requestId'>
): WebSocketResponseMessage => ({
    type: WsMessageTypes.RESPONSE_MESSAGE,
    requestId,
    statusCode,
    headers,
    url: parseUrl(url),
    body: Buffer.isBuffer(responseBody) ? responseBody.toString('base64') : ''
})

const parseUrl = (url: string | URL): string => typeof url === 'string' ? url : url.toString()
