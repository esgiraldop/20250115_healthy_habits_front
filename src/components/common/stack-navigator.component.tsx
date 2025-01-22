import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {HabitsListScreen} from '../../screens/habits-list.screen';
import {HabitsCalendarScreen} from '../../screens/habits-calendar.screen';
import {HabitsSummaryScreen} from '../../screens/habits-summary.screen';
import {CreateHabitScreen} from '../../screens/create-habit.screen';
import {EditHabitScreen} from '../../screens/edit-habit.screen';

export const StackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="HabitsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'gray',
        headerTitleStyle: {
          fontSize: 20,
          color: 'black',
        },
        animation: 'slide_from_right',
        freezeOnBlur: true,
      }}>
      <>
        <Stack.Screen
          name="HabitsList"
          component={HabitsListScreen}
          options={{
            title: 'All habits',
          }}
        />
        <Stack.Screen
          name="HabitsCalendar"
          component={HabitsCalendarScreen}
          options={{
            title: 'Habits calendar',
          }}
        />
        <Stack.Screen
          name="HabitsSummary"
          component={HabitsSummaryScreen}
          options={{
            title: 'Habits summary',
          }}
        />
        <Stack.Screen
          name="CreateHabit"
          component={CreateHabitScreen}
          options={{
            title: 'Create new habit',
          }}
        />
        <Stack.Screen
          name="EditHabit"
          component={EditHabitScreen}
          options={{
            title: 'Edit habit',
          }}
        />
      </>
    </Stack.Navigator>
  );
};
