import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { theme } from '../constants/theme';
import ListenNowScreen from '../components/listen_now/ListenNowScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import SearchScreen from '../components/search/SearchScreen';
import PodcastDetailsScreen from "../components/podcast_details/PodcastDetailsScreen";

const MainTab = createBottomTabNavigator();

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.white,
        headerTitleStyle: {
          fontWeight: 'normal',
        },
        headerTitleAlign: 'center'
      }}>
      <ListenNowStack.Screen
        options={{
          title: 'En écoute'
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  )
};

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.white,
        headerTitleStyle: {
          fontWeight: 'normal',
        },
        headerTitleAlign: 'center'
      }}>
      <LibraryStack.Screen
        options={{
          title: 'Bibliothèque'
        }}
        name="Library"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  )
};

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.primary,
        headerTitleStyle: {
          fontWeight: 'normal',
          color: theme.color.white
        },
        headerTitleAlign: 'center'
      }}>
      <SearchStack.Screen
        options={{
          title: 'Recherche'
        }}
        name="Search"
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{
          title: ''
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
    </SearchStack.Navigator>
  )
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: theme.color.blackLight,
        inactiveBackgroundColor: theme.color.blackLight,
        activeTintColor: theme.color.primary,
        inactiveTintColor: theme.color.white
      }}>
      <MainTab.Screen
        options={{
          title: 'En écoute',
          tabBarIcon: (props) => <FontAwesome5 name={'headphones'} color={props.color} size={theme.text.size.md} />

        }}
        name="ListenNow"
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Recherche',
          tabBarIcon: (props) => <FontAwesome5 name={'search'} color={props.color} size={theme.text.size.md} />
        }}
        name="Search"
        component={SearchStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Bibliothèque',
          tabBarIcon: (props) => <FontAwesome5 name={'archive'} color={props.color} size={theme.text.size.md} />

        }}
        name="Library"
        component={LibraryStackNavigator}
      />
    </MainTab.Navigator>
  )
};

export default MainTabNavigator
