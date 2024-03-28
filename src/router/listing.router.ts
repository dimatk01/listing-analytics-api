import Router from "koa-router";
import {ListingService} from "../services/listing.service";

export const ListingRouter = ()=>{
    const router = new Router()
    const listingService = new ListingService()
    router.get("/", listingService.addListing)
    return router
}