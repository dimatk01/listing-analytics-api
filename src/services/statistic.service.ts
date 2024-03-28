import {StatisticRepository} from "../repository/statistic.repository";
import {Context} from "koa";
import {Schema} from "joi";
import {statisticSchema} from "../schema/statistic.schema";

export class StatisticService {
    constructor(private readonly statisticRepository: StatisticRepository) {
    }

    addStatistic = async (ctx: Context) => {
        const {
            type,
            autoId
        } = ctx.request.body as ReturnType<Schema<typeof statisticSchema>["validate"]>["value"]
        ctx.status = 204;
        await this.statisticRepository.addStatistic(type, autoId)
    }

    getStatistic = async (ctx: Context) => {
        const url = ctx.request?.url
        console.log(url)
        const matches = url.match(/\/api\/statistic\/(\d+)/)
        const id = matches? matches[1] :-1
        const type = ctx?.query?.type as string

        ctx.status = 200;
        ctx.body = await this.statisticRepository.getStatistic(type,+id)
    }

}