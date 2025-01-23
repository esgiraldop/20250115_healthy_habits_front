import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

export const tableName = 'habits';

export const createHabitsTable = async (db: Transaction | SQLiteDatabase) => {
  // db.executeSql(`DROP TABLE [IF EXISTS] ${tableName};`); // Uncomment this resetting the database
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          created_at TEXT,
          date TEXT,
          init_hour TEXT,
          end_hour TEXT,
          repeatsEvery INTEGER,
          repeatsEvery_unit INTEGER,
          repeatsNum INTEGER,
          description TEXT
      );`;
  try {
    await db.executeSql(query);
    console.log('Habits table created sucessfully');
  } catch (error) {
    console.log(
      `Could not create ${tableName} table. ${JSON.stringify(error)}`,
    );
    throw new Error(
      `Could not create ${tableName} table. ${JSON.stringify(error)}`,
    );
  }
};
