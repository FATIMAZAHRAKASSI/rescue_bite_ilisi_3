import React, { useCallback } from 'react';
import * as Splashcreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Welcome, HomeOrganisation, HomeAdmin, HomeFoodBusiness, CreateFoodBusiness, CreateOrgaisation , SettingsOrganisation, CreerSignalCommerce , DetailsOrganisation , DetailsSignaux, GererSignauxCommerce,
  SettingsCommerce} from './screens';
import BottomTabNavigatorOrg from './navigation/organisationNavigation';
import BottomTabNavigatorCom from './navigation/commerceNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'SingleDay-Regular': require('./assets/fonts/SingleDay-Regular.ttf'),
    'Oswald-VariableFont_wght': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
    'RobotoSlab-VariableFont_wght': require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
    'RubikDoodleShadow-Regular': require('./assets/fonts/RubikDoodleShadow-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashcreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsSignaux" component={DetailsSignaux} options={{ headerShown: false }} />
        <Stack.Screen
          name="HomeOrganisation"
          options={{ headerShown: false }}
        >
          {() => (
            <BottomTabNavigatorOrg>
              <BottomTabNavigatorOrg.Screen name="HomeOrganisation" component={HomeOrganisation} />
              <BottomTabNavigatorOrg.Screen name="SettingsOrganisation" component={SettingsOrganisation} />
           </BottomTabNavigatorOrg>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="HomeFoodBusiness"
          options={{ headerShown: false }}
        >
          {() => (
            <BottomTabNavigatorCom>
              <BottomTabNavigatorCom.Screen name="HomeFoodBusiness" component={HomeFoodBusiness} />
              <BottomTabNavigatorCom.Screen name="CreerSignalCommerce" component={CreerSignalCommerce} />
              <BottomTabNavigatorCom.Screen name="GererSignauxCommerce" component={GererSignauxCommerce} />
              <BottomTabNavigatorCom.Screen name="SettingsCommerce" component={SettingsCommerce} />
           </BottomTabNavigatorCom>
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="CreateFoodBusiness" component={CreateFoodBusiness} options={{ headerShown: false }} />
        <Stack.Screen name="CreateOrgaisation" component={CreateOrgaisation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

