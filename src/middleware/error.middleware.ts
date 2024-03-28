import logger from '../logger'
import { Context, Next } from 'koa'

export default async function (ctx: Context, next: Next) {
  try {
    await next()
  } catch (ex: any) {
    if (ex.status && ex.status !== 500) {
      ctx.status = ex.status
      ctx.body = { message: ex.message }
    } else {
      logger.error('Unexpected Error: ', ex)
      ctx.status = 404
      ctx.body = { message: 'Invalid request' }
    }
  } finally {
    logger.info(`${ctx.request.method} ${ctx.request.path} ${ctx.status}`)
  }
}
