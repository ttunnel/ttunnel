export enum WsMessageTypes {
    ERROR_RESPONSE = 'ttunnel_ws_error',
    INITIAL_REQUEST = 'ttunnel_ws_initial_request',
    HOSTNAME_ASSIGNED = 'ttunnel_ws_hostname_assigned',
    REQUEST_MESSAGE = 'ttunnel_ws_request',
    RESPONSE_MESSAGE = 'ttunnel_ws_response',
}

export enum StorageKeys {
    API_KEY = 'ttunnel_api_key',
    CLIENT_ID = 'ttunnel_client_id',
}