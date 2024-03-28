import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import logger from "./logger";
import errorMiddleware from "./middleware/error.middleware";
import {config} from "dotenv"
import {clientPg} from "./connection/postgres-connection";
import {setupRouter} from "./router";
import Router from "koa-router";
import {responseMiddleware} from "./middleware/responseMiddleware";

config()

async function startServer() {
    const app: Koa = new Koa();
    const router = new Router()
    await clientPg.connect()
    setupRouter(router)

    app
        .use(responseMiddleware)
        .use(cors())
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
        .use(errorMiddleware)
logger.info( router.stack.map(layer => layer.path))
    const port = process.env.APP_PORT
    app.listen(port, () => logger.info(`Server started at ${port} port`))
}

startServer()