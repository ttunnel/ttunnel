import { removeClientId } from '../../storage'
import { displayError } from '../../utils'

export const wsClosedListener = (error) => {
    removeClientId()
    displayError('remote server closed the connection unexpectedly!')
}