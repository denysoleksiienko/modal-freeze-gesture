import React, {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../screens/Home';
import {Settings} from '../../screens/Settings';
import {Profile} from '../../screens/Profile';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
