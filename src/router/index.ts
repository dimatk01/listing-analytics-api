import Router from 'koa-router'
import {ListingService} from "../services/listing.service";
import {ListingRouter} from "./listing.router";
// export const statisticRouter = new Router()
// // statisticRouter.prefix("/")
// statisticRouter.get("/", ()=>console.log("klgrlg"))
// statisticRouter.routes()

export const setupRouter = (router: Router) => {
    const listingRouter = ListingRouter()
    router.prefix("/api")
    router.use("/listing", listingRouter.routes())
}