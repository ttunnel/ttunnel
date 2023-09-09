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
        'api-key': {
            alias: ['api-key'],
            description: 'Your TTunnel API Key to make sure all tunnels are authorized.'
        },
        endpoint: {
            alias: ['e', 'base'],
            defaultValue: 'ws://ttunnel.me:4000',
            description: 'Used for self-hosted ttunnel version. Defaults to ws://ttunnel.me:4000'
        },
        domain: {
            alias: ['d', 'subdomain'],
            description: 'Request a specific subdomain on the proxy server. Note You may not actually receive this name depending on availability.'
        },
        hostname: {
            alias: ['host'],
            defaultValue: '127.0.0.1',
            description: 'Proxy to a custom hostname instead of default one.'
        },
        'host-header': {
            description: 'set Host header',
        },
        'basic-auth': {
            alias: ['basic-auth'],
            description: 'enforce basic auth on tunnel endpoint, user:password',
        },
        'request-header-add': {
            alias: ['ra'],
            description: 'header key:value to add to request',
        },
        'request-header-remove': {
            alias: ['rh'],
            description: 'header field to remove from request if present',
        },
        'response-header-add': {
            alias: ['rra'],
            description: 'header key:value to add to response',
        },
        'response-header-remove': {
            alias: ['rrh'],
            description: 'header field to remove from response if present',
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
