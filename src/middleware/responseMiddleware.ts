import { Context, Next } from 'koa'

export async function responseMiddleware(ctx: Context, next: Next) {
  await next()
  if (ctx.status < 300) {
    ctx.body = {
      success: true,
      data: ctx?.body ?? null,
    }
  }
}
