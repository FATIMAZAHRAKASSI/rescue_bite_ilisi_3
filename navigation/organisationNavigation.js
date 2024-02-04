import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  { Welcome, Login, HomeOrganisation, HomeAdmin, HomeFoodBusiness, CreateOrgaisation, CreateFoodBusiness, SettingsOrganisation,OrganisationsOrganisation,CommercesOrganisation, BottomTabNavigatorC } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeOrganNavigation from './homeOrgaNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigatorOrg() {
  return (
    <Tab.Navigator initialRouteName='HomeOrganisation' 
     screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor:'#81657C',
       
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === 'HomeOrganNavigation') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'SettingsOrganisation') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          } else if (route.name === 'OrganisationsOrganisation') {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (route.name === 'CommercesOrganisation') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          } else if (route.name === 'OrderCreationNavigator') {
            iconName = 'ios-add'; // Use the 'add' icon for the OrderCreation screen
          }


          return <Icon name={iconName} size={22} color={color} />;
        },
        })}>
      <Tab.Screen name="HomeOrganNavigation" component={HomeOrganNavigation} />
      <Tab.Screen name="CommercesOrganisation" component={CommercesOrganisation} />
      <Tab.Screen name="OrganisationsOrganisation" component={OrganisationsOrganisation} />
      <Tab.Screen name="SettingsOrganisation" component={SettingsOrganisation} />
    </Tab.Navigator>
  );
}


export default BottomTabNavigatorOrg;

