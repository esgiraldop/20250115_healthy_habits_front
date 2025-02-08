import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import {HabitsController} from '../../../core/infrastructure/controllers/habits.controller';
import {freqUnitsCategories, IHabit} from '../../interfaces/habit.interface';
import {buttonStyles} from '../../styles/buttons.styles';
import {containersStyles} from '../../styles/containers.styles';
import {textStyles} from '../../styles/texts.styles';
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
      <TouchableOpacity
        style={[
          containersStyles.buttonContainer,
          containersStyles.horizontalAlign,
        ]}>
        <Text style={textStyles.title}>{habitData.name}</Text>
        <View style={containersStyles.verticalAlign}>
          <View style={containersStyles.horizontalLeftAlign}>
            <Text style={textStyles.normalBold}>Starts on: </Text>
            <Text style={textStyles.normal}>{habitData.date} </Text>
            <Text style={textStyles.normalBold}>From: </Text>
            <Text style={textStyles.normal}>{habitData.init_hour} </Text>
            <Text style={textStyles.normalBold}>To: </Text>
            <Text style={textStyles.normal}>{habitData.end_hour}</Text>
          </View>

          <View style={containersStyles.horizontalLeftAlign}>
            <Text style={textStyles.normalBold}>Repeats every: </Text>
            <Text style={textStyles.normal}>{habitData.repeatsEvery} </Text>
            <Text style={textStyles.normal}>{unitMeaning} </Text>
            <Text style={textStyles.normal}>, {habitData.repeatsNum} </Text>
            <Text style={textStyles.normalBold}>
              {habitData.repeatsNum === 1 ? 'time' : 'times'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={buttonStyles.smallButton}
          onPress={handleHabitDelete}>
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
