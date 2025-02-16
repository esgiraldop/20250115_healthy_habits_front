/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// External modules (third-party libraries)
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Internal modules (local files)
import {initializeDatabase} from './config/db/config/db.config';
import {StackNavigator} from './src/components/common/stack-navigator.component';
import {containersStyles} from './src/styles/containers.styles';
import {textStyles} from './src/styles/texts.styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [errorInitializingDb, setErrorInitializingDb] =
    useState<boolean>(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    let isMounted = true;
    async function openSqliteDb() {
      if (isMounted) {
        try {
          await initializeDatabase(); // Perform any sqlite operation that causes a side effect. Initializing the database and creating the table "habit" is a side effect
        } catch (error) {
          setErrorInitializingDb(true);
        }
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
      {!errorInitializingDb ? (
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      ) : (
        <View style={containersStyles.flatListContainer}>
          <Text
            style={[containersStyles.verticalAlign, textStyles.CenteredText]}>
            There was an error initializing the database
          </Text>
        </View>
      )}
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
