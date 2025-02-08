import {useNavigation} from '@react-navigation/native';
// eslint-disable-next-line import/named
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {RepeatsEvery_unit_enum} from '../../core/domain/entities/habits/entities/habits.entity';
import {HabitsController} from '../../core/infrastructure/controllers/habits.controller';
import {DropdownCategories} from '../components/common/dropdown-categories.component';
import {MyDateTimePicker} from '../components/common/my-date-time-picker.component';
import {RootStackParamList} from '../interfaces';
import {freqUnitsCategories, ICreateHabit} from '../interfaces/habit.interface';
import {habitSchema} from '../schemas/habit.schema';
import {buttonStyles} from '../styles/buttons.styles';
import {containersStyles} from '../styles/containers.styles';
import {
  currentDate,
  getISODateString,
  getMilitaryTimeString,
} from '../utilities/dates.utility';

type CreateHabitScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateHabit'
>;

export type Mode = 'date' | 'time';

export type DateTimePickerEvent = {
  type: string;
  nativeEvent: {
    timestamp: number;
  };
};

export const CreateHabitScreen = () => {
  const navigation = useNavigation<CreateHabitScreenProp>();

  // const initialValues: ICreateHabit = {
  const initialValues: ICreateHabit = {
    name: '',
    date: getISODateString(currentDate),
    init_hour: '00:00',
    end_hour: '00:00',
    repeatsEvery: 0,
    repeatsEvery_unit: RepeatsEvery_unit_enum.D,
    repeatsNum: 1,
    description: '',
  };

  const onSubmit = async (values: ICreateHabit) => {
    await HabitsController.create(values);
    console.log('These are the values: ', values);
    navigation.goBack();
  };

  const [date, setDate] = useState<Date>(new Date());
  const [initHour, setInitHour] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showInitHour, setShowInitHour] = useState<boolean>(false);
  const [showEndHour, setShowEndHour] = useState<boolean>(false);

  return (
    <ScrollView>
      <View style={containersStyles.flatListContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={habitSchema}
          onSubmit={onSubmit}>
          {formikProps => {
            return (
              <View>
                <Text>Name</Text>
                <TextInput
                  defaultValue={initialValues.name}
                  onChangeText={formikProps.handleChange('name')}
                  onBlur={() => formikProps.setFieldTouched('name', true)}
                  value={formikProps.values.name}
                  placeholder="Enter the habit name"
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <Text style={{color: 'red'}}>{formikProps.errors.name}</Text>
                )}

                <Text>Date</Text>
                <MyDateTimePicker
                  mode={'date'}
                  show={showDate}
                  date={date}
                  onChange={(_, selectedDate) => {
                    setDate(selectedDate || date);
                    formikProps.setFieldValue(
                      'date',
                      getISODateString(
                        selectedDate ? selectedDate : currentDate,
                      ),
                    );
                    setShowDate(false);
                  }}
                />
                <TextInput
                  onChangeText={() => {
                    formikProps.handleChange('date');
                  }}
                  onBlur={() => {
                    setShowDate(false);
                    formikProps.setFieldTouched('date', false);
                  }}
                  onTouchStart={() => {
                    setShowDate(true);
                    formikProps.setFieldTouched('date', true);
                  }}
                  value={formikProps.values.date}
                  placeholder="Enter the date"
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.date && formikProps.errors.date && (
                  <Text style={{color: 'red'}}>{formikProps.errors.date}</Text>
                )}

                <Text>Initial hour</Text>
                <MyDateTimePicker
                  mode={'time'}
                  show={showInitHour}
                  date={initHour}
                  onChange={(_, selectedHour) => {
                    setInitHour(selectedHour || initHour);
                    formikProps.setFieldValue(
                      'init_hour',
                      getMilitaryTimeString(
                        selectedHour ? selectedHour : currentDate,
                      ),
                    );
                    setShowInitHour(false);
                  }}
                />
                <TextInput
                  onChangeText={formikProps.handleChange('init_hour')}
                  onBlur={() => {
                    setShowInitHour(false);
                    formikProps.setFieldTouched('init_hour', true);
                  }}
                  onTouchStart={() => {
                    setShowInitHour(true);
                    formikProps.setFieldTouched('init_hour', true);
                  }}
                  value={String(formikProps.values.init_hour)}
                  placeholder="Enter the initial time of the day"
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.init_hour &&
                  formikProps.errors.init_hour && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.init_hour}
                    </Text>
                  )}

                <Text>End hour</Text>
                <MyDateTimePicker
                  mode={'time'}
                  show={showEndHour}
                  date={endHour}
                  onChange={(_, selectedHour) => {
                    setEndHour(selectedHour || endHour);
                    formikProps.setFieldValue(
                      'end_hour',
                      getMilitaryTimeString(
                        selectedHour ? selectedHour : currentDate,
                      ),
                    );
                    setShowEndHour(false);
                  }}
                />
                <TextInput
                  onChangeText={formikProps.handleChange('end_hour')}
                  onBlur={() => {
                    setShowEndHour(false);
                    formikProps.setFieldTouched('end_hour', true);
                  }}
                  onTouchStart={() => {
                    setShowEndHour(true);
                    formikProps.setFieldTouched('end_hour', true);
                  }}
                  value={String(formikProps.values.end_hour)}
                  placeholder="Enter the end time of the day"
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.end_hour &&
                  formikProps.errors.end_hour && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.end_hour}
                    </Text>
                  )}

                <Text>Repeats every</Text>
                <TextInput
                  onChangeText={formikProps.handleChange('repeatsEvery')}
                  onBlur={() =>
                    formikProps.setFieldTouched('repeatsEvery', true)
                  }
                  value={String(formikProps.values.repeatsEvery)}
                  placeholder={String(formikProps.values.repeatsEvery)}
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.repeatsEvery &&
                  formikProps.errors.repeatsEvery && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.repeatsEvery}
                    </Text>
                  )}

                {/* <Text>repeatsEvery_unit</Text> */}
                <DropdownCategories<typeof freqUnitsCategories>
                  categories={freqUnitsCategories}
                  value={String(formikProps.values.repeatsEvery_unit)}
                  onChange={selectedValue =>
                    formikProps.setFieldValue(
                      'repeatsEvery_unit',
                      selectedValue,
                    )
                  }
                  onBlur={() =>
                    formikProps.setFieldTouched('repeatsEvery_unit', true)
                  }
                  placeholder={String(
                    formikProps.initialValues.repeatsEvery_unit,
                  )}
                />
                {formikProps.touched.repeatsEvery_unit &&
                  formikProps.errors.repeatsEvery_unit && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.repeatsEvery_unit}
                    </Text>
                  )}

                <Text>description</Text>
                <TextInput
                  onChangeText={formikProps.handleChange('description')}
                  onBlur={() =>
                    formikProps.setFieldTouched('description', true)
                  }
                  value={String(formikProps.values.description)}
                  placeholder={String(formikProps.values.description)}
                  placeholderTextColor={'gray'}
                />
                {formikProps.touched.description &&
                  formikProps.errors.description && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.description}
                    </Text>
                  )}

                <TouchableOpacity
                  style={buttonStyles.normalButton}
                  // style={buttonStyle.acceptButton}
                  onPress={() => formikProps.handleSubmit()}
                  disabled={!formikProps.isValid || formikProps.isSubmitting}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator
                      size="large"
                      // color={theme.colors.textPrimary}
                    />
                  ) : (
                    <Text
                    // style={textStyles.darkButtonText}
                    >
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};
