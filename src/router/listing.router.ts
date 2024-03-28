import Router from "koa-router";
import {ListingService} from "../services/listing.service";
import {validate} from "../middleware/validation.middlevare";
import {listingSchema} from "../schema/listing.schema";

export const ListingRouter = ()=>{
    const router = new Router()
    const listingService = new ListingService()
    router.post("/", validate(listingSchema), listingService.addListing)
    return router
}