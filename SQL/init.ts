import {clientPg} from "../src/connection/postgres-connection";
import logger from "../src/logger";
async function executeQuery() {
    try {
        await clientPg.connect();
        await clientPg.query('BEGIN');

        await clientPg.query(`
      CREATE TABLE listings (
          autoId SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description TEXT,
          ownerName VARCHAR(255),
          phoneNumber VARCHAR(20)
      )
    `);
        await clientPg.query(`
      CREATE TABLE statistics (
          id SERIAL PRIMARY KEY,
          autoId INTEGER UNIQUE,
          watch INTEGER DEFAULT 0,
          goal INTEGER DEFAULT 0,
          FOREIGN KEY (autoId) REFERENCES listings(autoId) ON DELETE CASCADE
      )
    `);
        /*
        *  Де watch - перегляд сторінки лістингу
        * goal - цільова дія, тобто, клік по номеру
        */

        await clientPg.query('COMMIT');
        logger.info("The tables have been successfully created")
    } catch (error) {
        await clientPg.query('ROLLBACK');
        logger.error(error);
    } finally {
        await clientPg.end();
    }
}
executeQuery();