import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeOrganisation, DetailSignal} from '../screens';

const Stack = createStackNavigator();

function HomeOrgaNavigation() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='HomeOrganisation'>
      <Stack.Screen name='HomeOrganisation' component={HomeOrganisation} />
      <Stack.Screen name='DetailSignal' component={DetailSignal} options={{
            headerShown:true,
            title:'',
            headerStyle: {
      height: 20, // Adjust the height as needed
    },
          }} />
    </Stack.Navigator>
  );
}

export default HomeOrgaNavigation;