import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect} from 'react';
import {View} from 'react-native';

import {DateTimePickerEvent, Mode} from '../../screens/create-habit.screen';

interface IMyDateTimePicker {
  mode: Mode;
  show: boolean;
  date: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  minimumDate?: Date | undefined;
  maximumDate?: Date | undefined;
}

export const MyDateTimePicker: React.FC<IMyDateTimePicker> = ({
  mode,
  show,
  date,
  onChange,
  minimumDate,
  maximumDate,
}: IMyDateTimePicker) => {
  useEffect(() => {
    console.log('\nminimumDate: ', minimumDate);
  }, [date, minimumDate]);

  // useEffect(() => {
  //   console.log('\nmaximumDate: ', maximumDate);
  // }, [date, maximumDate]);

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          display="default"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};
