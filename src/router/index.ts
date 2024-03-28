import Router from 'koa-router'
// export const statisticRouter = new Router()
// // statisticRouter.prefix("/")
// statisticRouter.get("/", ()=>console.log("klgrlg"))
// statisticRouter.routes()

export const setupRouter = (router: Router) => {
    router.prefix("/api")
    router.get("/statistic", ()=>console.log("klgrlg") )
    // router.
    return router
}