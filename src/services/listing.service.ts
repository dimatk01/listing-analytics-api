import {Context} from "koa";

export class ListingService{
    async addListing(ctx: Context){
        return ctx.body= "Hell"

    }
}