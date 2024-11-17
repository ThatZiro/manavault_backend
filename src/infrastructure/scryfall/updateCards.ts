import axios from 'axios';
import Card from "../database/models/card.model";

const SCRYFALL_BULK_DATA_URL = 'https://api.scryfall.com/bulk-data';
const BULK_TYPE = 'default_cards';

/**
 * Fetch and update the card database with the latest data from Scryfall.
 * - Fetches metadata for available bulk data from Scryfall.
 * - Downloads the specified bulk data file.
 * - Clears the existing database entries.
 * - Inserts the new card data.
 */
async function fetchAndUpdateCards(): Promise<void> {
  try {
    console.log('Fetching bulk data metadata...');
    const response = await axios.get(SCRYFALL_BULK_DATA_URL);

    // Find the bulk data type we need
    const bulkData = response.data.data;
    const targetBulkData = bulkData.find((data: any) => data.type === BULK_TYPE);

    if (!targetBulkData) {
      throw new Error(`Bulk data type '${BULK_TYPE}' not found in metadata.`);
    }

    console.log(`Downloading data from ${targetBulkData.download_uri}...`);
    const bulkDataResponse = await axios.get(targetBulkData.download_uri);

    console.log('Data downloaded. Starting database update...');

    // Update the database within a transaction
    await Card.sequelize!.transaction(async (transaction) => {
      console.log('Clearing existing data...');
      await Card.destroy({ where: {}, truncate: true, transaction }); // Clear existing data

      console.log('Preparing new data for insertion...');
      const cards = bulkDataResponse.data.map((card: any) => ({
        id: card.id,
        name: card.name,
        type: card.type_line,
        oracle_text: card.oracle_text,
        mana_cost: card.mana_cost,
        power: card.power,
        toughness: card.toughness,
        colors: card.colors,
        rarity: card.rarity,
      }));

      console.log(`Inserting ${cards.length} cards into the database...`);
      await insertInChunks(cards, transaction);
    });

    console.log('Database updated successfully!');
  } catch (error) {
    if (error instanceof Error) {
      // Handle standard error objects
      console.error('Error during card update:', error.message);
      console.error('Stack trace:', error.stack);
    } else {
      // Handle unexpected error types
      console.error('Unknown error during card update:', error);
    }
    throw error;
  }
}

const CHUNK_SIZE = 1000; // Insert 1000 records at a time

async function insertInChunks(cards: any[], transaction: any) {
  console.log(`Inserting ${cards.length} cards in chunks of ${CHUNK_SIZE}...`);

  for (let i = 0; i < cards.length; i += CHUNK_SIZE) {
    const chunk = cards.slice(i, i + CHUNK_SIZE);
    await Card.bulkCreate(chunk, { transaction });
    console.log(`Inserted ${i + chunk.length} of ${cards.length} cards`);
  }
}

export default fetchAndUpdateCards;
