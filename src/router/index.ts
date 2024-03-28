import Router from 'koa-router'
import {ListingRouter} from "./listing.router";
import {StatisticRouter} from "./statistic.router";

export const setupRouter = (router: Router) => {
    const listingRouter = ListingRouter()
    const statisticRouter = StatisticRouter()
    router.prefix("/api")
    router.use("/listing", listingRouter.routes())
    router.use("/statistic", statisticRouter.routes())
}