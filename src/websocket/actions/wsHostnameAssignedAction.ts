import { yellow } from 'colors'
import { green } from 'colors/safe'
import { log } from '../../utils'
import { StartCommandArguments } from '../../commands'
import { WebSocketHostnameAssignedMessage } from '../../types'
import { CustomWebSocket } from '../customWebsocket'
import { setClientId } from '../../storage'

export const wsHostnameAssignedAction = (
    websocket: CustomWebSocket,
    message: WebSocketHostnameAssignedMessage,
    { port, hostname }: Pick<StartCommandArguments, 'port' | 'hostname'>
) => {
    setClientId(message.connectionId)

    const httpUrl = `http://${message.hostname}`
    const httpsUrl = `https://${message.hostname}`

    const local = `${hostname}:${port}`

    let logMessage = green(`Tunnel is running...\n\n`)

    logMessage += `${yellow.bold(`- ${httpUrl}`)}  is forwarding to ${local}\n`
    logMessage += `${yellow.bold(`- ${httpsUrl}`)} is forwarding to ${local}\n\n`

    log(logMessage)
}
