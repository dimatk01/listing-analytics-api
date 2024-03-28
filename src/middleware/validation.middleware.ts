import {Context, Next} from "koa";
import {Schema} from "joi";
import logger from "../logger";

export function validate(schema: Schema ) {
    return async (ctx: Context, next: Next) => {
        try {
            const { error, value } = schema.validate(ctx.request?.body);

            if (error) {
                ctx.status = 422;
                ctx.body = { message: error.details.map(e => e.message) };
            } else {
                ctx.request.body = value;
                await next();
            }
        } catch (err: any) {
            logger.error(err?.message)
            ctx.status = 500;
            ctx.body = { message: 'Internal Server Error' };
        }
    };
}