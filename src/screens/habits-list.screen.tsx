import React from 'react';
import {Button, FlatList, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {useHabits} from '../hooks/use-habits.hook';

type HabitsListScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'HabitsList'
>;

interface HabitItemProps {
  title: string;
}

const Item: React.FC<HabitItemProps> = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const HabitsListScreen = () => {
  const navigation = useNavigation<HabitsListScreenProp>();

  const {habits, isHabitLoading} = useHabits();

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
            renderItem={({item}) => <Item title={item.name} />}
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
});
