import Router from "koa-router";
import {ListingRepository} from "../repository/listing.repository";
import {ListingService} from "../services/listing.service";
import {validate} from "../middleware/validation.middleware";
import {StatisticService} from "../services/statistic.service";
import {StatisticRepository} from "../repository/statistic.repository";
import {statisticSchema} from "../schema/statistic.schema";

export const StatisticRouter =()=>{
    const router = new Router()
    const statisticRepository = new StatisticRepository()
    const statisticService = new StatisticService(statisticRepository)

    router.post("/", validate(statisticSchema), statisticService.addStatistic)
    router.get("/:id", statisticService.getStatistic)

    return router
}