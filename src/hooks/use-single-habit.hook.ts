import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

import {HabitsController} from '../../core/infrastructure/controllers/habits.controller';
import {IHabit} from '../interfaces/habit.interface';

export function useSingleHabit(habitId: string) {
  const [singleHabit, setSingleHabit] = useState<IHabit | null>(null);
  const [isSingleHabitLoading, setIsSingleHabitLoading] = useState<
    boolean | null
  >(null);

  const getSingleHabitInfo = async (isMounted: boolean) => {
    if (isMounted) {
      setIsSingleHabitLoading(true);
      const singleHabitInfo = await HabitsController.getHabitById(habitId);
      setSingleHabit(singleHabitInfo);
      setIsSingleHabitLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      getSingleHabitInfo(isMounted);
      return () => (isMounted = false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return {
    singleHabit,
    setSingleHabit,
    isSingleHabitLoading,
    setIsSingleHabitLoading,
  };
}
