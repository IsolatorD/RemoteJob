import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ChatsScreen, HomeScreen, NotificationsScreen, ProfileScreen } from '../screens';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Timeline"
      screenOptions={({ route }:any) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:any;
          switch (route.name) {
            case 'Timeline':
              iconName = 'ios-home';
              break;
            case 'Chat':
              iconName = 'ios-chatbubbles';
              break;
            case 'Notifications':
              iconName = 'ios-notifications';
              break;
            case 'Profile':
              iconName = 'ios-person';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarLabel: ({ focused, color }) => {
          let label:any;
          switch (route.name) {
            case 'Timeline':
              label = 'Inicio';
              break;
            case 'Chat':
              label = 'Chats';
              break;
            case 'Notifications':
              label = 'Notificaciones';
              break;
            case 'Profile':
              label = 'Perfil';
              break;
          }
          return  focused ? <Text>{label}</Text> : null;
        }
      })}
    >
      <Tab.Screen name="Timeline" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;