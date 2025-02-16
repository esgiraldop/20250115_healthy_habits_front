import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

export const habitsTableName = 'habits';
export const habitsComplianceTableName = 'habits_compliance';

export const createHabitsTable = async (db: Transaction | SQLiteDatabase) => {
  // db.executeSql(`DROP TABLE IF EXISTS ${habitsTableName};`); // Uncomment this resetting the database
  const query = `CREATE TABLE IF NOT EXISTS ${habitsTableName}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          created_at TEXT,
          date TEXT,
          init_hour TEXT,
          end_hour TEXT,
          repeatsEvery INTEGER,
          repeatsEvery_unit TEXT,
          repeatsNum INTEGER,
          description TEXT
      );`;
  try {
    await db.executeSql(query);
    console.log(`${habitsTableName} table created sucessfully`);
  } catch (error) {
    console.log(
      `Could not create ${habitsTableName} table. ${JSON.stringify(error)}`,
    );
    throw new Error(
      `Could not create ${habitsTableName} table. ${JSON.stringify(error)}`,
    );
  }
};

export const createHabitsComplianceTable = async (db: Transaction) => {
  // db.executeSql(`DROP TABLE [IF EXISTS] ${habitsComplianceTableName};`); // Uncomment this resetting the database
  const query = `CREATE TABLE IF NOT EXISTS ${habitsComplianceTableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        habit_id INTEGER, 
        compliance_date TEXT, 
        was_checked TEXT,
        FOREIGN KEY(habit_id) REFERENCES habits(id)
    );`;
  try {
    await db.executeSql(query);
    console.log(`${habitsComplianceTableName} table created sucessfully`);
  } catch (error) {
    console.log(
      `Could not create ${habitsComplianceTableName} table. ${JSON.stringify(error)}`,
    );
    throw new Error(
      `Could not create ${habitsComplianceTableName} table. ${JSON.stringify(error)}`,
    );
  }
};

export const printDatabaseTables = async (db: SQLiteDatabase) => {
  const query = `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`;
  try {
    const results = await db.executeSql(query);
    if (results.length > 0) {
      const tableNames = results[0].rows.raw().map(row => row.name); // Extract table names
      console.log(`The table names are: ${JSON.stringify(tableNames)}`);
    } else {
      console.log('No tables found in the database.');
    }
  } catch (error) {
    console.log('Could not get the table names: ', JSON.stringify(error));
    throw new Error(`Could not get the table names: ${JSON.stringify(error)}`);
  }
};
