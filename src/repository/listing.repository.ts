import logger from "../logger";
import {clientPg} from "../connection/postgres-connection";

export class ListingRepository {
    constructor() {
    }

    async addListing(title: string, description: string, ownerName: string, phoneNumber: string) {
        try {
            await clientPg.query('BEGIN');

            const listingQuery = `
      INSERT INTO listings (title, description, ownerName, phoneNumber)
      VALUES ($1, $2, $3, $4)
      RETURNING autoId;
    `;
            const listingValues = [title, description, ownerName, phoneNumber];
            const listingResult = await clientPg.query(listingQuery, listingValues);
            const autoId = listingResult.rows[0].autoid;

            const statisticQuery = `
      INSERT INTO statistics (autoId, watch, goal)
      VALUES ($1, 0, 0);
    `;
            const statisticValues = [autoId];
            await clientPg.query(statisticQuery, statisticValues);

            await clientPg.query('COMMIT');
            return {autoId}
        } catch (error) {
            await clientPg.query('ROLLBACK');
            logger.error('Error creating listing', error);
            throw new Error("Error creating listing")
        }
    }

    async getAll(page: number, perPage: number) {
        const query = `SELECT * FROM listings
                ORDER BY autoId
                OFFSET $1
                LIMIT $2;
        `
        const {rows: result} = await clientPg.query(query, [page * perPage, perPage])
        const {rows: count} = await clientPg.query("SELECT COUNT(*) FROM listings;")
        return {result, count: +count[0]?.count}
    }
}