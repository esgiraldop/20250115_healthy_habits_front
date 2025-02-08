import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {View} from 'react-native';

import {DateTimePickerEvent, Mode} from '../../screens/create-habit.screen';

interface IMyDateTimePicker {
  mode: Mode;
  show: boolean;
  date: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

export const MyDateTimePicker: React.FC<IMyDateTimePicker> = ({
  mode,
  show,
  date,
  onChange,
}: IMyDateTimePicker) => {
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
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};
