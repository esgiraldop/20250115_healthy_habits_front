// 1. External modules (third-party libraries)
import {ResultSet} from 'react-native-sqlite-storage';

// 2. Internal modules (project-specific imports)
import {sqliteDb} from '../../../config/db/config/db.config';
import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {
  HabitCreateRequest,
  HabitUpdateRequest,
} from '../../domain/entities/habits/request/habits.request';
import {HabitsInterface} from '../../domain/interfaces/habits.interface';

export class HabitsRepository implements HabitsInterface {
  tableName: string;
  constructor() {
    this.tableName = 'habits';
  }

  async getAll(): Promise<Habit[]> {
    const habits: Habit[] = [];
    try {
      const response = await sqliteDb.executeSql(
        `SELECT * FROM ${this.tableName}`,
      );
      response.forEach((habit: ResultSet) => {
        for (let i = 0; i < habit.rows.length; i++) {
          habits.push(habit.rows.item(i));
        }
      });
      return habits;
    } catch (error) {
      console.log('ERROR: ', habits);
      throw new Error(`Failed to get habits:  ${error}`);
    }
  }

  async getHabitById(habitId: string): Promise<Habit> {
    const habit: Habit | null = null;
    try {
      const response = await sqliteDb.executeSql(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [habitId],
      );
      return response[0].rows.item(0);
    } catch (error) {
      console.log('ERROR: ', habit);
      throw new Error(`Failed to get habit with id ${habitId}:  ${error}`);
    }
  }

  async create(habit: HabitCreateRequest): Promise<null> {
    try {
      await sqliteDb.executeSql(
        `INSERT INTO ${this.tableName}(name, created_at, date, init_hour, end_hour, repeatsEvery, repeatsEvery_unit, repeatsNum, description) VALUES (?,current_timestamp, ?, ?, ?, ?, ?, ?, ?)`,
        [
          habit.name,
          habit.date,
          habit.init_hour,
          habit.end_hour,
          habit.repeatsEvery,
          habit.repeatsEvery_unit,
          habit.repeatsNum,
          habit.description,
        ],
      );
      console.log(`Habit ${habit} inserted sucessfully`);
      return null;
    } catch (error) {
      console.log(`Error inserting the habit: ${JSON.stringify(error)}`);
      throw new Error(`Error inserting the habit: ${error}`);
    }
  }

  async update(habit: HabitUpdateRequest): Promise<null> {
    try {
      await sqliteDb.executeSql(
        `UPDATE ${this.tableName}
          SET name = ?,
              date = ?,
              init_hour = ?,
              end_hour = ?, 
              repeatsEvery = ?,
              repeatsEvery_unit = ?,
              repeatsNum = ?,
              description = ?
          WHERE
              id = ?`,
        [
          habit.name,
          habit.date,
          habit.init_hour,
          habit.end_hour,
          habit.repeatsEvery,
          habit.repeatsEvery_unit,
          habit.repeatsNum,
          habit.description,
          habit.id,
        ],
      );
      console.log(`Habit ${habit} updated sucessfully`);
      return null;
    } catch (error) {
      console.log(`Error updating the habit: ${JSON.stringify(error)}`);
      throw new Error(`Error updating the habit: ${error}`);
    }
  }

  async delete(habitId: string): Promise<null> {
    try {
      await sqliteDb.executeSql(`DELETE FROM ${this.tableName} WHERE id = ?;`, [
        habitId,
      ]);
      console.log(`Habit with id ${habitId} deleted sucessfully`);
      return null;
    } catch (error) {
      console.log(
        `There was an error deleting the habit: ${JSON.stringify(error)}}`,
      );
      throw new Error(`Error inserting the habit: ${error}`);
    }
  }
}
