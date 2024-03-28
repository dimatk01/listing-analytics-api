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
        } catch (error) {
            await clientPg.query('ROLLBACK');
            logger.error('Error creating listing', error);
            throw new Error("Error creating listing")
        }
    }
}