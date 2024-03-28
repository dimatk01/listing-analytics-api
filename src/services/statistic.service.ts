import {StatisticRepository} from "../repository/statistic.repository";
import {Context} from "koa";
import {Schema} from "joi";
import {statisticSchema} from "../schema/statistic.schema";
import {EventsTypes} from "../schema/events.types";

export class StatisticService {
    constructor(private readonly statisticRepository: StatisticRepository) {
    }

    addStatistic = async (ctx: Context) => {
        const {
            type,
            autoId
        } = ctx.request.body as ReturnType<Schema<typeof statisticSchema>["validate"]>["value"]
        ctx.status = 204;
        await this.statisticRepository.addWatch(type, autoId)
    }

}