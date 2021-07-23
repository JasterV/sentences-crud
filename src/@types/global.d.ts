import config from '../config'

declare global {
    export type Config = typeof config
}
