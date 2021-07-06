import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import screens from './src/routes/home';

const Stack = createStackNavigator();

export default function App() {

  renderScreens = () => {
    return screens.map(({ component: Component, name, title }, i) => {
      return (
        <Stack.Screen
          key={i}
          name={name}
          component={Component}
          options={{
            title,
          }}
        />
      )
    })
  }

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <NavigationContainer documentTitle={"Expense Tracker"}>
        <Stack.Navigator>
          {renderScreens()}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#a1a1a1',
  },
});
