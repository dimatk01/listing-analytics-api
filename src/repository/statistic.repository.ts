import { EventsTypes, EventsTypesValue } from '../schema/events.types'
import { clientPg } from '../connection/postgres-connection'

export class StatisticRepository {
  constructor() {}

  async addStatistic(type: EventsTypesValue, autoId: number) {
    const query = `
      UPDATE statistics
      SET ${type} = ${type} + 1
      WHERE autoId = $1;
    `
    await clientPg.query(query, [autoId])
  }

  async getStatistic(type: string | undefined, autoId: number) {
    let fieldName = '*'
    if (type === EventsTypes.goal) {
      fieldName = `autoId, ${EventsTypes.goal}`
    }
    if (type === EventsTypes.watch) {
      fieldName = `autoId, ${EventsTypes.watch}`
    }
    const query = `
      SELECT ${fieldName} FROM statistics
      WHERE autoId = $1;
    `
    const { rows } = await clientPg.query(query, [autoId])
    return rows?.pop() ?? {}
  }
}
