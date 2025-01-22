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
  sqliteDb = await getDBConnection();
  await sqliteDb.transaction(tx => createHabitsTable(tx));
  // console.log('Habits table created sucessfully');
  // console.log(
  //   'habits table is: ',
  //   await sqliteDb.executeSql(`SELECT * FROM habits`),
  // );
};
