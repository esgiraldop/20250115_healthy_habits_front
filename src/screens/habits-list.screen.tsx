import {useNavigation} from '@react-navigation/native';
// eslint-disable-next-line import/named
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';

import {HabitDetailsButton} from '../components/habits-list/habit-details-button.component';
import {useHabits} from '../hooks/use-habits.hook';
import {RootStackParamList} from '../interfaces';
import {buttonStyles} from '../styles/buttons.styles';
import {containersStyles} from '../styles/containers.styles';

export type HabitsListScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'HabitsList'
>;

export const HabitsListScreen = () => {
  const navigation = useNavigation<HabitsListScreenProp>();

  const {habits, isHabitLoading, isHabitDeleting, setIsHabitDeleting} =
    useHabits();

  return (
    <View style={containersStyles.flatListContainer}>
      <View style={containersStyles.horizontalRightAlign}>
        <TouchableOpacity
          style={buttonStyles.normalButton}
          onPress={() => navigation.navigate('HabitsCalendar')}>
          <Text>Go to calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyles.normalButton}
          onPress={() => navigation.navigate('CreateHabit')}>
          <Text>Create a habit</Text>
        </TouchableOpacity>
      </View>
      {!isHabitLoading && isHabitDeleting ? (
        <View>
          <Text>Deleting habit...</Text>
        </View>
      ) : isHabitLoading && !isHabitDeleting ? (
        <View>
          <Text>Habits loading...</Text>
        </View>
      ) : habits && habits.length < 1 ? (
        <View>
          <Text>Please add a habit to start.</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={habits}
            renderItem={({item}) => (
              <HabitDetailsButton
                habitData={item}
                isHabitDeleting={isHabitDeleting}
                setIsHabitDeleting={setIsHabitDeleting}
                HabitsListNavigation={navigation}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};
