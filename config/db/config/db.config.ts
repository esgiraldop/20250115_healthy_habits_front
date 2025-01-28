import {
  enablePromise,
  openDatabase,
  SQLError,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import {createHabitsTable} from '../models/habits.model';

enablePromise(true);

const sucessDb = () => {
  console.log('Database opened sucessfully');
  // () => sqliteDb.transaction(tx => createTable(tx));
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
    // const tables = await sqliteDb.executeSql(
    //   `SELECT * FROM sqlite_master WHERE type='table';`,
    // );
    // console.log('ALL TABLES ARE: ', tables[0].rows.item(1));

    await createHabitsTable(sqliteDb);

    // const habitsTable = await sqliteDb.executeSql(`SELECT * FROM habits`);
    // console.log('habits table is: ', habitsTable[0]);
  } catch (error) {
    console.log(`Error during database initialization: ${error}`);
    throw new Error(`Error during database initialization: ${error}`);
  }
};
