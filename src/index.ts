export * from './commands'
export * from './websocket'
export * from './enums'
export * from './pkg'
export * from './storage'
export * from './utils'
export * from './types'

const commands = [`${__dirname}/commands`]
const plugins = [
    '@lesy/lesy-plugin-prompt',
    '@lesy/lesy-plugin-validator',
    '@lesy/lesy-plugin-help'
]

export { commands, plugins }