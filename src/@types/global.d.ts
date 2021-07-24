import config from '../config'
import db from '../db'

declare global {
    export type Config = typeof config
    export type DB = typeof db
}
