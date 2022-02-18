import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from 'screens/Search';
import ContentDetails from 'screens/ContentDetails';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="ContentDetails"
        component={ContentDetails}
        options={{headerTitle: 'Content Details'}}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
