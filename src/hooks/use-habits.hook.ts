import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

import {HabitsController} from '../../core/infrastructure/controllers/habits.controller';
import {IHabit} from '../interfaces/habit.interface';

export function useHabits() {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isHabitLoading, setIsHabitLoading] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function getHabitsInfo() {
        setIsHabitLoading(true);
        const habitsInfo = await HabitsController.getAll();
        if (habitsInfo.length > 0) {
          setHabits(habitsInfo);
          setIsHabitLoading(false);
        } else {
          setIsHabitLoading(false);
        }
      }

      getHabitsInfo();
      return () => getHabitsInfo();
    }, []),
  );

  return {
    habits,
    setHabits,
    isHabitLoading,
    setIsHabitLoading,
  };
}
