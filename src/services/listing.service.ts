import {Context} from "koa";
import {Schema} from "joi";
import {listingSchema} from "../schema/listing.schema";
import {ListingRepository} from "../repository/listing.repository";
import logger from "../logger";

export class ListingService {

    constructor(private readonly listingRepository: ListingRepository) {
    }

    addListing = async (ctx: Context) => {
        const {
            title,
            description,
            ownerName,
            phoneNumber
        } = ctx.request.body as ReturnType<Schema<typeof listingSchema>["validate"]>["value"]
        ctx.status = 201
        ctx.body = await this.listingRepository.addListing(title, description, ownerName, phoneNumber)
    }

    getAll = async (ctx: Context) => {
        const {
            page = 0, perPage = 10
        } = ctx.request.query
        ctx.status = 200
        ctx.body = await this.listingRepository.getAll(+page, +perPage)
    }

    getById = async (ctx: Context) => {
        const url = ctx.request?.url
        const id = url?.split("/").pop() ?? ""
        ctx.status = 200
        ctx.body = await this.listingRepository.getById(+id)
    }
}