import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {IDropdownCategories} from '../../interfaces/dropDown.interface';
import {getUnitCategoriesJson} from '../../utilities/getUnitCategories.utility';

export const DropdownCategories = <T extends Record<string, string>>({
  categories,
  value,
  onChange,
  onBlur,
  placeholder,
}: IDropdownCategories<T>): React.JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const dropdownData = getUnitCategoriesJson(categories);

  // Render the label above the dropdown if focused or value exists
  const renderLabel = (): JSX.Element | null => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Select category
        </Text>
      );
    }
    return null;
  };

  return (
    <View
    // style={[textStyles.inputField, containerStyles.inputFieldDarkThicker]}
    >
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {
            // borderColor: theme.colors.backgroundLight,
            borderWidth: 2,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        // containerStyle={containerStyles.greenAccent}
        // itemTextStyle={textStyles.textBody2}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="val"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          onBlur(value);
        }}
        onChange={item => {
          setIsFocus(false);
          onChange(item.val);
        }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    // borderColor: theme.colors.borderColor,
    borderWidth: 0.5,
    // borderRadius: theme.spacing.small,
    // paddingHorizontal: theme.spacing.small,
  },
  label: {
    position: 'absolute',
    // backgroundColor: theme.colors.backgroundLight,
    // left: theme.spacing.large,
    top: 8,
    zIndex: 999,
    // paddingHorizontal: theme.spacing.small,
    // fontSize: theme.typography.body2.fontSize,
    // color: theme.colors.textDark,
  },
  placeholderStyle: {
    // fontSize: theme.typography.body2.fontSize,
    // color: theme.colors.textSecondary,
  },
  selectedTextStyle: {
    // fontSize: theme.typography.body2.fontSize,
    // color: theme.colors.textSecondary,
  },
  inputSearchStyle: {
    height: 40,
    // fontSize: theme.typography.body2.fontSize,
    // color: theme.colors.textSecondary,
  },
});
