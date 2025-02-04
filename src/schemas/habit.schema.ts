import * as Yup from 'yup';

import {RepeatsEvery_unit_enum} from '../../core/domain/entities/habits/entities/habits.entity';

export const habitSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  // date: Yup.string().required('Date is required'),
  // init_hour: Yup.number()
  //   .required('Initial hour is required')
  //   .min(0, 'Initial hour must be at least 0')
  //   .max(23, 'Initial hour must be at most 23'),
  // end_hour: Yup.number()
  //   .required('End hour is required')
  //   .min(0, 'End hour must be at least 0')
  //   .max(23, 'End hour must be at most 23'),
  // repeatsEvery: Yup.number()
  //   .required('Repeats every is required')
  //   .min(1, 'Repeats every must be at least 1'),
  // repeatsEvery_unit: Yup.mixed<RepeatsEvery_unit_enum>() //For enums
  //   .oneOf(
  //     Object.values(RepeatsEvery_unit_enum).filter(
  //       value => typeof value === 'string',
  //     ) as RepeatsEvery_unit_enum[],
  //   ) // The filter is for getting only the values of the object that are of the type "number"
  //   .required('Repeats every unit is required'),
  // repeatsNum: Yup.number()
  //   .required('Repeats number is required')
  //   .min(1, 'Repeats number must be at least 1'),
  // description: Yup.string().optional(),
});
