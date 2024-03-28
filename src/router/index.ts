import Router from 'koa-router'
import {ListingRouter} from "./listing.router";

export const setupRouter = (router: Router) => {
    const listingRouter = ListingRouter()
    router.prefix("/api")
    router.use("/listing", listingRouter.routes())
}