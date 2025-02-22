import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

import {HabitsController} from '../../core/infrastructure/controllers/habits.controller';
import {IHabit} from '../interfaces/habit.interface';

export function useHabits() {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isHabitLoading, setIsHabitLoading] = useState<boolean | null>(null);
  const [isHabitDeleting, setIsHabitDeleting] = useState<boolean | null>(null);

  const getHabitsInfo = async (isMounted: boolean) => {
    if (isMounted || isHabitDeleting) {
      setIsHabitLoading(true);
      const habitsInfo = await HabitsController.getAll();
      setHabits(habitsInfo);
      setIsHabitLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getHabitsInfo(isMounted);
      return () => (isMounted = false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHabitDeleting]),
  );

  return {
    habits,
    setHabits,
    isHabitLoading,
    setIsHabitLoading,
    isHabitDeleting,
    setIsHabitDeleting,
  };
}
