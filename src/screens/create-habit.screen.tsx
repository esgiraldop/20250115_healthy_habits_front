import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {freqUnitsCategories, ICreateHabit} from '../interfaces/habit.interface';
import {RepeatsEvery_unit_enum} from '../../core/domain/entities/habits/entities/habits.entity';
import {DropdownCategories} from '../components/common/dropdown-categories.component';
import {habitSchema} from '../schemas/habit.schema';

type CreateHabitScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateHabit'
>;

export const CreateHabitScreen = () => {
  const navigation = useNavigation<CreateHabitScreenProp>();

  const initialValues: ICreateHabit = {
    name: '',
    date: '',
    init_hour: 0,
    end_hour: 0,
    repeatsEvery: 0,
    repeatsEvery_unit: RepeatsEvery_unit_enum.D,
    repeatsNum: 1,
    description: '',
  };

  const onSubmit = (values: ICreateHabit) => {
    console.log(`values ${values} submitted`);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <Formik
          initialValues={initialValues}
          validationSchema={habitSchema}
          onSubmit={onSubmit}>
          {formikProps => (
            <View>
              <Text>Name</Text>
              <TextInput
                onChangeText={formikProps.handleChange('name')}
                onBlur={formikProps.handleBlur('name')}
                value={formikProps.values.name}
                placeholder="Enter the habit name"
                placeholderTextColor={'gray'}
              />
              {formikProps.touched.name && formikProps.errors.name && (
                <Text style={{color: 'red'}}>{formikProps.errors.name}</Text>
              )}

              <Text>Date</Text>
              <TextInput
                onChangeText={formikProps.handleChange('date')}
                onBlur={formikProps.handleBlur('date')}
                value={formikProps.values.date}
                placeholder="Enter the date"
                placeholderTextColor={'gray'}
              />
              {formikProps.touched.date && formikProps.errors.date && (
                <Text style={{color: 'red'}}>{formikProps.errors.date}</Text>
              )}

              <Text>Initial hour</Text>
              <TextInput
                onChangeText={formikProps.handleChange('init_hour')}
                onBlur={formikProps.handleBlur('init_hour')}
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
              <TextInput
                onChangeText={formikProps.handleChange('end_hour')}
                onBlur={formikProps.handleBlur('end_hour')}
                value={String(formikProps.values.end_hour)}
                placeholder="Enter the end time of the day"
                placeholderTextColor={'gray'}
              />
              {formikProps.touched.end_hour && formikProps.errors.end_hour && (
                <Text style={{color: 'red'}}>
                  {formikProps.errors.end_hour}
                </Text>
              )}

              <Text>repeatsEvery</Text>
              <TextInput
                onChangeText={formikProps.handleChange('repeatsEvery')}
                onBlur={formikProps.handleBlur('repeatsEvery')}
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

              <Text>repeatsEvery_unit</Text>
              <DropdownCategories<typeof freqUnitsCategories>
                categories={freqUnitsCategories}
                value={String(formikProps.values.repeatsEvery_unit)}
                onChange={formikProps.handleChange('repeatsEvery_unit')}
                onBlur={formikProps.handleBlur('repeatsEvery_unit')}
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
                onBlur={formikProps.handleBlur('description')}
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
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
