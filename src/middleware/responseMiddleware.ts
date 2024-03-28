import {Context} from "koa";

export async function responseMiddleware (ctx: Context, ){
        ctx.body = {
            success: true,
            data: ctx?.body ?? null
        };

}