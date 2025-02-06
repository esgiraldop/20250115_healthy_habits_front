import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {HabitsController} from '../../../core/infrastructure/controllers/habits.controller';
import {freqUnitsCategories, IHabit} from '../../interfaces/habit.interface';
import {
  getUnitCategoriesJson,
  getUnitMeaning,
} from '../../utilities/getUnitCategories.utility';

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
  const handleHabitDelete = () => {
    async function deleteHabit() {
      setIsHabitDeleting(true);
      await HabitsController.delete(String(habitData.id));
      setIsHabitDeleting(false);
    }

    deleteHabit();
  };

  const [unitMeaning, setUnitmeaning] = useState<string | undefined>();

  useEffect(() => {
    const unitMeaningResponse = getUnitMeaning(
      habitData.repeatsEvery_unit,
      getUnitCategoriesJson(freqUnitsCategories),
    );

    setUnitmeaning(
      habitData.repeatsEvery === 1
        ? unitMeaningResponse
        : unitMeaningResponse + 's',
    );
  }, [habitData, setUnitmeaning]);

  return (
    <>
      <TouchableOpacity style={[styles.item, styles.horizontalAlign]}>
        <Text style={styles.title}>{habitData.name}</Text>
        <View style={styles.verticalAlign}>
          <View style={styles.horizontalLeftAlign}>
            <Text style={styles.normalBold}>Starts on: </Text>
            <Text style={styles.normal}>{habitData.date} </Text>
            <Text style={styles.normalBold}>From: </Text>
            <Text style={styles.normal}>{habitData.end_hour} </Text>
            <Text style={styles.normalBold}>To: </Text>
            <Text style={styles.normal}>{habitData.init_hour}</Text>
          </View>

          <View style={styles.horizontalLeftAlign}>
            <Text style={styles.normalBold}>Repeats every: </Text>
            <Text style={styles.normal}>{habitData.repeatsEvery} </Text>
            <Text style={styles.normal}>{unitMeaning} </Text>
            <Text style={styles.normal}>, {habitData.repeatsNum} </Text>
            <Text style={styles.normalBold}>
              {habitData.repeatsNum === 1 ? 'time' : 'times'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleHabitDelete}>
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
  normalBold: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  normal: {
    fontSize: 12,
    fontWeight: 'black',
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
  horizontalLeftAlign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  verticalAlign: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF6961',
    borderRadius: 5,
    padding: 5,
  },
});
