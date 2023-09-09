import { green } from 'colors/safe'
import { initStorage, setApiKey } from '../storage'

export default {
    name: 'apiKey',
    description: 'Update or set TTunnel API Key',
    aliases: ['api-key'],
    args: {
        apiKey: {
            required: true,
        },
    },
    run: async ({ args }) => {
        await initStorage()

        setApiKey(args.apiKey)

        console.log(`${green('Your API Key has been updated successfully.')}`)
    }
}
