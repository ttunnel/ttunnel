import { StartCommandArguments } from '../../commands'
import { displayError } from '../../utils'
import { removeClientId } from '../../storage'

export const wsErrorListener =
    (args: StartCommandArguments) =>
        (error) => {
            removeClientId()
            displayError(`couldn't establish a connection\n\n`)
        }