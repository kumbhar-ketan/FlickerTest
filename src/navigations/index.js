import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SearchStack from './SearchStack';

const Navigator = () => {
  return (
    <NavigationContainer>
      <SearchStack />
    </NavigationContainer>
  );
};

export default Navigator;
