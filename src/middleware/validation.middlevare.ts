import {Context, Next} from "koa";
import {Schema} from "joi";

export function validate(schema: Schema ) {
    return async (ctx: Context, next: Next) => {
        try {
            const { error, value } = schema.validate(ctx.request?.body);

            if (error) {
                ctx.status = 422;
                console.log(error)
                ctx.body = { error: error.details.map(e => e.message) };
            } else {
                ctx.request.body = value;
                await next();
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Internal Server Error' };
        }
    };
}