// eslint-disable-next-line import/named
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
import {useSingleHabit} from '../hooks/use-single-habit.hook';
import {RootStackParamList} from '../interfaces';
import {freqUnitsCategories, IUpdateHabit} from '../interfaces/habit.interface';
import {habitSchema} from '../schemas/habit.schema';
import {buttonStyles} from '../styles/buttons.styles';
import {containersStyles} from '../styles/containers.styles';
import {
  currentDate,
  getISODateString,
  getMilitaryTimeString,
  militaryTimeStringToDate,
} from '../utilities/dates.utility';

type editHabitScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditHabit'
>;

type editHabitScreenRouteProp = RouteProp<RootStackParamList, 'EditHabit'>;

export const EditHabitScreen = () => {
  const navigation = useNavigation<editHabitScreenProp>();

  const {params} = useRoute<editHabitScreenRouteProp>();
  const {singleHabit, isSingleHabitLoading} = useSingleHabit(params.habitId);

  const [date, setDate] = useState<Date>(new Date());
  const [initHour, setInitHour] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showInitHour, setShowInitHour] = useState<boolean>(false);
  const [showEndHour, setShowEndHour] = useState<boolean>(false);

  const initialValues: IUpdateHabit = {
    id: +params.habitId,
    name: singleHabit?.name || '',
    date: singleHabit?.date || '',
    init_hour: singleHabit?.init_hour || '',
    end_hour: singleHabit?.end_hour || '',
    repeatsEvery: singleHabit?.repeatsEvery || 0,
    repeatsEvery_unit:
      singleHabit?.repeatsEvery_unit || RepeatsEvery_unit_enum.D,
    repeatsNum: singleHabit?.repeatsNum || 0,
    description: singleHabit?.description || '',
  };

  const onSubmit = async (values: IUpdateHabit) => {
    console.log('The values that will be updated are: ', values);
    await HabitsController.update(values);
    navigation.goBack();
  };

  return (
    <ScrollView>
      {isSingleHabitLoading ? (
        <Text>The habit with id {params.habitId} is loading...</Text>
      ) : (
        <View style={containersStyles.flatListContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={habitSchema}>
            {formikProps => {
              return (
                <>
                  <Text>name</Text>
                  <TextInput
                    onChangeText={formikProps.handleChange('name')}
                    onBlur={() => formikProps.setFieldTouched('name', true)}
                    value={formikProps.values.name}
                    defaultValue={initialValues.name}
                  />
                  {formikProps.touched.name && formikProps.errors.name && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.name}
                    </Text>
                  )}

                  <Text>date</Text>
                  <MyDateTimePicker
                    mode={'date'}
                    show={showDate}
                    date={new Date(formikProps.initialValues.date) || date}
                    onChange={(_, selectedDate) => {
                      setDate(selectedDate || new Date(initialValues.date));
                      formikProps.setFieldValue(
                        'date',
                        getISODateString(selectedDate ? selectedDate : date),
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
                  />
                  {formikProps.touched.date && formikProps.errors.date && (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.date}
                    </Text>
                  )}

                  <Text>init_hour</Text>
                  <MyDateTimePicker
                    mode={'time'}
                    show={showInitHour}
                    date={
                      new Date(formikProps.initialValues.init_hour) || initHour
                    }
                    onChange={(_, selectedHour) => {
                      setInitHour(
                        selectedHour ||
                          militaryTimeStringToDate(initialValues.init_hour),
                      );
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
                  />
                  {formikProps.touched.init_hour &&
                    formikProps.errors.init_hour && (
                      <Text style={{color: 'red'}}>
                        {formikProps.errors.init_hour}
                      </Text>
                    )}

                  <Text>end_hour</Text>
                  <MyDateTimePicker
                    mode={'time'}
                    show={showEndHour}
                    date={
                      new Date(formikProps.initialValues.end_hour) || endHour
                    }
                    onChange={(_, selectedHour) => {
                      setEndHour(
                        selectedHour ||
                          militaryTimeStringToDate(initialValues.init_hour),
                      );
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
                  />
                  {formikProps.touched.repeatsEvery &&
                    formikProps.errors.repeatsEvery && (
                      <Text style={{color: 'red'}}>
                        {formikProps.errors.repeatsEvery}
                      </Text>
                    )}

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
                  />
                  {formikProps.touched.description &&
                    formikProps.errors.description && (
                      <Text style={{color: 'red'}}>
                        {formikProps.errors.description}
                      </Text>
                    )}

                  <TouchableOpacity
                    disabled={!formikProps.isValid || formikProps.isSubmitting}
                    style={buttonStyles.normalButton}
                    onPress={() => formikProps.handleSubmit()}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator
                        size="large"
                        // color={theme.colors.textPrimary}
                      />
                    ) : (
                      <Text>Submit</Text>
                    )}
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </View>
      )}
    </ScrollView>
  );
};
