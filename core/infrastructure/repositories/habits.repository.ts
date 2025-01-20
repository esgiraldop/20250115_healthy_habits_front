import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {HabitsInterface} from '../../domain/interfaces/habits.interface';
import {sqlitePool} from '../config/db.config';

export class HabitRepository implements HabitsInterface {
  tableName: string;
  constructor() {
    this.tableName = 'habits';
  }

  async getAll(): Promise<Habit[]> {
    const habits: Habit[] = [];
    try {
      const response = await sqlitePool.executeSql(
        `SELECT * FROM ${this.tableName}`,
      );
      response.forEach(habit => {
        for (let i = 0; i < habit.rows.length; i++) {
          habits.push(habit.rows.item(i));
        }
      });
      console.log('The items are: ', habits);
      return habits;
    } catch (error) {
      console.log('ERROR: ', habits);
      throw new Error(`Failed to get habits:  ${error}`);
    }
  }

  async create(habit: Habit): Promise<null> {
    try {
      sqlitePool.executeSql(
        `INSERT OR REPLACE INTO ${this.tableName}(created_at, init_hour, end_hour, repeatsEvery, repeatsEvery_unit, repeatsNum, description) VALUES (NOW(), ?, ?, ?, ?, ?, ?)`,
        [
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
      throw new Error(`Error inserting the habit: ${error}`);
    }
  }
}
