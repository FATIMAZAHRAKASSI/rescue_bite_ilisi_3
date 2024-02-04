import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  {  DetailsSignaux,CreerSignalCommerce, GererSignauxCommerce,SettingsCommerce } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';

import HomeCommNavigation from './homecommercenavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function GererSignauxStack() {
  return (
    <Stack.Navigator

    screenOptions={{
      headerStyle: {
        backgroundColor: '#E6E6FA', // Couleur de fond de l'en-tête
      },
      headerTintColor: COLORS.purple1, // Couleur du texte de l'en-tête
      
    }}
    
    >
      <Stack.Screen name="GererSignauxCommerce" component={GererSignauxCommerce}         options={{ headerShown: false }}  />
      <Stack.Screen name="DetailsSignaux" component={DetailsSignaux}         options={{ headerShown: true , headerTitle: 'Back to All Signals'}}/>
    </Stack.Navigator>
  );
}
function BottomTabNavigatorCom() {
  return (
    <Tab.Navigator initialRouteName='HomeFoodBusiness' 
     screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor:'#81657C',
       
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === 'HomeCommNavigation') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'CreerSignalCommerce') {
            iconName = focused ? 'ios-add' : 'ios-add-outline';
          } else if (route.name === 'GererSignauxCommerce') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'SettingsCommerce') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          } else if (route.name === 'OrderCreationNavigator') {
            iconName = 'ios-add'; // Use the 'add' icon for the OrderCreation screen
          }


          return <Icon name={iconName} size={22} color={color} />;
        },

        tabBarLabel: ({ focused, color }) => {
          let labelText;
          // Définissez les labels en fonction du nom de la route
          if (route.name === 'HomeCommNavigation') {
            labelText = 'Home';
          } else if (route.name === 'CreerSignalCommerce') {
            labelText = 'Add Signal';
          }else if (route.name === 'GererSignauxCommerce') {
            labelText = 'Signals';
          }else if (route.name === 'SettingsCommerce') {
            labelText = 'Add Signal';
          }
          // Retournez le texte du label avec la couleur
          return <Text style={{ color: color, fontSize: 12 }}>{labelText}</Text>;
        },
        })}>
      <Tab.Screen name="HomeCommNavigation" component={HomeCommNavigation} />
      <Tab.Screen name="CreerSignalCommerce" component={CreerSignalCommerce} />
      <Tab.Screen name="GererSignauxCommerce" component={GererSignauxStack} />
      <Tab.Screen name="SettingsCommerce" component={SettingsCommerce} />

    </Tab.Navigator>
  );
}


export default BottomTabNavigatorCom;