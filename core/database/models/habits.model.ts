import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

export const tableName = 'habits';

export const createHabitsTable = async (db: Transaction | SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.executeSql(query);
};
