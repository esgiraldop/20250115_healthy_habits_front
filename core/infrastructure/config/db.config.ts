import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
// Read dotenv config files here

export let sqlitePool: SQLiteDatabase;

export const getDBConnection = async () => {
  return openDatabase({name: 'habits-data.db', location: 'default'});
};
