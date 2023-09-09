export type BasicAuth = {user: string; pass: string}

export type KeyValuePair = {key: string, value: string}

export type RawStartCommandArguments =
    Omit<
        StartCommandArguments,
        'basicAuth'
        | 'requestHeaderAdd'
        | 'requestHeaderRemove'
        | 'responseHeaderAdd'
        | 'responseHeaderRemove'
        | 'apiKey'
        | 'hostHeader'
    >
        & {
            'api-key'?: string
            'host-header'?: string
            'basic-auth': string | string[]
            'request-header-add': string | string[]
            'request-header-remove': string | string[]
            'response-header-add': string | string[]
            'response-header-remove': string | string[]
        }

export type StartCommandArguments = {
    port: number
    hostname: string
    endpoint: string
    apiKey?: string
    domain?: string
    hostHeader?: string
    basicAuth?: BasicAuth
    requestHeaderAdd?: KeyValuePair[]
    requestHeaderRemove?: string[]
    responseHeaderAdd?: KeyValuePair[]
    responseHeaderRemove?: string[]
}