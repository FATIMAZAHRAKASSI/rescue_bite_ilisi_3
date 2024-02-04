import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeFoodBusiness, DetailsOrganisation} from '../screens';

const Stack = createStackNavigator();

function HomeCommNavigation() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName=''>
      <Stack.Screen name='HomeFoodBusiness' component={HomeFoodBusiness} />
      <Stack.Screen name='DetailsOrganisation' component={DetailsOrganisation} options={{
            headerShown:true,
            title:'',
            headerStyle: {
      height: 20, // Adjust the height as needed
    },
          }} />
    </Stack.Navigator>
  );
}

export default HomeCommNavigation;