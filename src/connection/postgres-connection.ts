import {Client} from 'pg';
import {config} from "dotenv"
config()

export const clientPg = new Client({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
});
