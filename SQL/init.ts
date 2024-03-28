import { clientPg } from "../src/connection/postgres-connection";
import logger from "../src/logger";

async function executeQuery() {
    try {
        await clientPg.connect();
        await clientPg.query('BEGIN');

        const listingsTableCheck = await clientPg.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'listings'
            )
        `);
        const listingsTableExists = listingsTableCheck.rows[0].exists;

        if (!listingsTableExists) {
            await clientPg.query(`
                CREATE TABLE listings (
                    autoId SERIAL PRIMARY KEY,
                    title VARCHAR(255),
                    description TEXT,
                    ownerName VARCHAR(255),
                    phoneNumber VARCHAR(20)
                )
            `);
        }

        const statisticsTableCheck = await clientPg.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'statistics'
            )
        `);
        const statisticsTableExists = statisticsTableCheck.rows[0].exists;

        if (!statisticsTableExists) {
            await clientPg.query(`
                CREATE TABLE statistics (
                    id SERIAL PRIMARY KEY,
                    autoId INTEGER UNIQUE,
                    watch INTEGER DEFAULT 0,
                    goal INTEGER DEFAULT 0,
                    FOREIGN KEY (autoId) REFERENCES listings(autoId) ON DELETE CASCADE
                )
            `);
        }

        await clientPg.query('COMMIT');
        logger.info("The tables have been successfully created");
    } catch (error) {
        await clientPg.query('ROLLBACK');
        logger.error(error);
    } finally {
        await clientPg.end();
    }
}

executeQuery();
