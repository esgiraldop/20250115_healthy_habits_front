import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

import {HabitsController} from '../../core/infrastructure/controllers/habits.controller';
import {IHabit} from '../interfaces/habit.interface';

export function useHabits() {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isHabitLoading, setIsHabitLoading] = useState<boolean | null>(null);
  // const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      async function getHabitsInfo() {
        if (isMounted) {
          setIsHabitLoading(true);
          const habitsInfo = await HabitsController.getAll();
          if (habitsInfo.length > 0) {
            setHabits(habitsInfo);
            setIsHabitLoading(false);
          } else {
            setIsHabitLoading(false);
          }
        }
      }

      getHabitsInfo();
      return () => (isMounted = false);
    }, []),
  );

  return {
    habits,
    setHabits,
    isHabitLoading,
    setIsHabitLoading,
    // setIsDeleted,
  };
}
