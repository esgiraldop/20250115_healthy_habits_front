/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// External modules (third-party libraries)
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Internal modules (local files)
import {initializeDatabase} from './config/db/config/db.config';
import {StackNavigator} from './src/components/common/stack-navigator.component';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    let isMounted = true;
    async function openSqliteDb() {
      if (isMounted) {
        await initializeDatabase(); // Perform any sqlite operation that causes a side effect. Initializing the database and creating the table "habit" is a side effect
      }
    }

    openSqliteDb();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
