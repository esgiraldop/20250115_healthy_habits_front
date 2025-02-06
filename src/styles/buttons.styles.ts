import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  complexButton: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  smallButton: {
    backgroundColor: '#FF6961',
    borderRadius: 5,
    padding: 5,
  },
  normalButton: {
    backgroundColor: '#03a9f4',
    borderRadius: 5,
    padding: 10,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
