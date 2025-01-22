import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../interfaces';
import {useNavigation} from '@react-navigation/native';

type habitsListScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'HabitsList'
>;

export const HabitsListScreen = () => {
  const navigation = useNavigation<habitsListScreenProp>();

  return (
    <View>
      <Text>This is the component for HabitsListScreen</Text>
      <Button
        title="This button takes to habits calendar"
        onPress={() => navigation.navigate('HabitsCalendar')}
      />
    </View>
  );
};
