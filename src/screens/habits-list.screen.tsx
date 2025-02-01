import {useNavigation} from '@react-navigation/native';
// eslint-disable-next-line import/named
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, FlatList, Text, View, StyleSheet} from 'react-native';

import {HabitDetailsButton} from '../components/habits-list/habit-details-button.component';
import {useHabits} from '../hooks/use-habits.hook';
import {RootStackParamList} from '../interfaces';

type HabitsListScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'HabitsList'
>;

export const HabitsListScreen = () => {
  const navigation = useNavigation<HabitsListScreenProp>();

  const {habits, isHabitLoading, setIsDeleted} = useHabits();

  return (
    <View style={styles.container}>
      <Button
        title="This button takes to habits calendar"
        onPress={() => navigation.navigate('HabitsCalendar')}
      />
      <Button
        title="This button takes to create a habit form"
        onPress={() => navigation.navigate('CreateHabit')}
      />
      {isHabitLoading ? (
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
                setIsDeleted={setIsDeleted}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
