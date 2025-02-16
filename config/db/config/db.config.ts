import {
  enablePromise,
  openDatabase,
  SQLError,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import {
  createHabitsComplianceTable,
  createHabitsTable,
  printDatabaseTables,
} from '../models/habits.model';

enablePromise(true);

const sucessDb = async () => {
  console.log('Database connection opened');
  sqliteDb.transaction(
    async tx => {
      console.log('Creating habits table...');
      createHabitsTable(tx);
      console.log('Creating habits compliance table...');
      createHabitsComplianceTable(tx);
    },
    error => console.log('Error with transaction: ', error),
    undefined,
  );
};

const errorDb = (err: SQLError) => {
  console.log('Error opening the database: ', err);
};

const getDBConnection = async (): Promise<SQLiteDatabase> =>
  openDatabase(
    {name: 'habits-data.db', location: 'default'},
    sucessDb,
    errorDb,
  );

export let sqliteDb: SQLiteDatabase;

export const initializeDatabase = async () => {
  try {
    sqliteDb = await getDBConnection();

    await printDatabaseTables(sqliteDb);
  } catch (error) {
    console.log(
      `Error during database initialization: ${JSON.stringify(error)}`,
    );
    throw new Error(
      `Error during database initialization: ${JSON.stringify(error)}`,
    );
  }
};
