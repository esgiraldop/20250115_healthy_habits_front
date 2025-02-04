import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {HabitsController} from '../../../core/infrastructure/controllers/habits.controller';
import {IHabit} from '../../interfaces/habit.interface';

interface IHabitDetailsButton {
  habitData: IHabit;
  isHabitDeleting: boolean | null;
  setIsHabitDeleting: (isHabitDeleting: boolean | null) => void;
}

export const HabitDetailsButton: React.FC<IHabitDetailsButton> = ({
  habitData,
  isHabitDeleting,
  setIsHabitDeleting,
}) => {
  const handleDelete = () => {
    async function deleteHabit() {
      setIsHabitDeleting(true);
      await HabitsController.delete(String(habitData.id));
    }

    deleteHabit();
  };

  return (
    <>
      <TouchableOpacity style={[styles.item, styles.horizontalAlign]}>
        <Text style={styles.title}>{habitData.name}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          {!isHabitDeleting ? (
            <Text>Delete</Text>
          ) : (
            <ActivityIndicator
              size="large"
              // color={theme.colors.textPrimary}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textError: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  horizontalAlign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF6961',
    borderRadius: 5,
    padding: 5,
  },
});
