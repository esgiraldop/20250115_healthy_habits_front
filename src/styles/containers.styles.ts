import {StyleSheet} from 'react-native';

export const containersStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  horizontalAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalLeftAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  horizontalRightAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  verticalAlign: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
