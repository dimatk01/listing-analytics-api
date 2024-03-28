import { EventsTypesValue} from "../schema/events.types";
import {clientPg} from "../connection/postgres-connection";

export class StatisticRepository {
    constructor() {
    }
    async addWatch (type: EventsTypesValue, autoId: number){
        const query = `
      UPDATE statistics
      SET ${type} = ${type} + 1
      WHERE autoId = $1;
    `;
         await clientPg.query(query, [autoId]);

    }
}