import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {theme} from '../constants/theme'
import ListenNowScreen from '../components/listen_now/ListenNowScreen'
import PlaylistScreen from '../components/playlist/Playlist Screen'

const HomeTab = createMaterialTopTabNavigator()

const ListenNowStack = createStackNavigator()
const PlaylistStack = createStackNavigator()

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ListenNowStack.Screen
        options={{
          title: 'En écoute',
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  )
}

const PlaylistStackNavigator = () => {
  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PlaylistStack.Screen
        options={{
          title: 'Liste de lecture',
        }}
        name="Playlist"
        component={PlaylistScreen}
      />
    </PlaylistStack.Navigator>
  )
}

const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator
      tabBarPosition="top"
      tabBarOptions={{
        activeTintColor: theme.color.white,
        inactiveTintColor: theme.color.grey,
        showIcon: false,
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        iconStyle: {
          justifyContent: 'center',
        },
        labelStyle: {
          textTransform: 'none',
          fontSize: theme.text.size.md,
          fontWeight: 'bold',
        },
        tabStyle: {
          flexDirection: 'row',
        },
        style: {
          backgroundColor: theme.color.black,
        },
      }}>
      <HomeTab.Screen
        options={{
          title: 'Ecoutés récemment',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'headphones'}
              color={props.color}
              size={theme.text.size.md}
            />
          ),
        }}
        name="ListenNow"
        component={ListenNowStackNavigator}
      />
      <HomeTab.Screen
        options={{
          title: 'Liste de lecture',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'list'}
              color={props.color}
              size={theme.text.size.md}
            />
          ),
        }}
        name="Playlist"
        component={PlaylistStackNavigator}
      />
    </HomeTab.Navigator>
  )
}

export default HomeTabNavigator
