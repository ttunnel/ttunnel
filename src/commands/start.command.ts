import clear from 'clear'
import { initStorage } from '../storage'
import { startWs } from '../websocket/startWs'

export default {
    name: 'start',
    description: 'Make an elegant tunnel to expose yourself to the world',
    aliases: ['s', 't', 'tunnel'],
    args: {
        port: {
            required: true,
        },
    },
    flags: {
        apiKey: {
            alias: ['api-key'],
        },
        endpoint: {
            alias: ['e', 'base'],
        },
        domain: {
            alias: ['d', 'subdomain'],
        },
        hostname: {
            alias: ['h', 'host'],
        },
        hostHeader: {
            alias: ['host-header'],
        },
    },
    run: async ({ args, flags }) => {
        const { port } = args

        await initStorage()

        clear()

        try {
            startWs({ port, ...flags })
        } catch (e) {
            console.error(e)
            return
        }
    }
}
