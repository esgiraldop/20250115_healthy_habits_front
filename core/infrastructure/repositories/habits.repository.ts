import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {HabitRequest} from '../../domain/entities/habits/request/habits.request';
import {HabitsInterface} from '../../domain/interfaces/habits.interface';
import {sqliteDb} from '../../database/config/db.config';

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
      response.forEach((habit: any) => {
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

  async create(habit: HabitRequest): Promise<null> {
    try {
      sqliteDb.executeSql(
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
