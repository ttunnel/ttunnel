import http, {
    IncomingHttpHeaders,
    IncomingMessage,
} from 'http'
import { gray } from 'colors'
import {
    wsSendMessage,
    mergeOrReplaceHeaders,
    removeHeaders,
    solveGzipEncodingHeaders,
    displayError,
    log,
} from '../../utils'
import { StartCommandArguments } from '../../commands'
import { WebSocketRequestMessage, WebSocketResponseMessage } from '../../types'
import { WsMessageTypes } from '../../enums'
import pkg from '../../pkg'
import { CustomWebSocket } from '../customWebsocket'

type ActionCommandProps =
    Pick<
        StartCommandArguments,
        'port'
        | 'hostname'
        | 'hostHeader'
        | 'requestHeaderAdd'
        | 'requestHeaderRemove'
        | 'responseHeaderAdd'
        | 'responseHeaderRemove'
    >

export const wsRequestMessageAction = (
    websocket: CustomWebSocket,
    message: WebSocketRequestMessage,
    {
        port,
        hostname,
        hostHeader,
        requestHeaderAdd,
        requestHeaderRemove,
        responseHeaderAdd,
        responseHeaderRemove,
    }: ActionCommandProps
) => {
    const { url, requestId, method, headers: requestHeaders, body } = message

    if (!url) return

    logRequestInfo({ requestId, url, method })

    const via = `1.1 ${hostname} (proxy/${pkg.version})`

    // We don't want the user to remove or overwrite certian headers like Host, via or X-Forwarded-IP
    // So user modifications must be at the top of all modifications
    const headers = mergeOrReplaceHeaders(
        removeHeaders(requestHeaders, requestHeaderRemove ?? []),
        requestHeaderAdd ?? []
    )

    const request = http.request(
        {
            hostname,
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
                        mergeOrReplaceHeaders(
                            removeHeaders(
                                response.headers,
                                responseHeaderRemove ?? []
                            ),
                            responseHeaderAdd ?? []
                        ),
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

const logRequestInfo = ({
    requestId,
    url,
    method,
}: Pick<WebSocketRequestMessage, 'requestId' | 'url' | 'method'>) => {
    log(`\t${gray.bold('request id')} > ${requestId}\n`)
    log(`\t${gray.bold('method')} > ${method.toUpperCase()}\n`)
    log(`\t${gray.bold('url')} > ${url}\n`)
}