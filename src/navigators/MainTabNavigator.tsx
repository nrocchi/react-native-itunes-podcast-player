import React from 'react';
import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {theme} from '../constants/theme';
import ListenNowScreen from '../components/listen_now/ListenNowScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import SearchScreen from '../components/search/SearchScreen';
import PodcastDetailsScreen from "../components/podcast_details/PodcastDetailsScreen";
import MiniPlayer from "../components/mini_player/MiniPlayer";
import EpisodeDetailsScreen from "../components/episode_details/EpisodeDetailsScreen";

const MainTab = createBottomTabNavigator();

const ListenNowStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator
      screenOptions={{
        headerShown: false
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
        headerShown: false
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
        headerBackTitle: 'Retour',
      }}>
      <SearchStack.Screen
        options={{
          headerShown: false,
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
      <SearchStack.Screen
        options={{
          title: ''
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
      />
    </SearchStack.Navigator>
  )
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={(tabsProps) => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}
      tabBarOptions={{
        activeBackgroundColor: theme.color.blackLight,
        inactiveBackgroundColor: theme.color.blackLight,
        activeTintColor: theme.color.primary,
        inactiveTintColor: theme.color.white,
        tabStyle: {
          paddingTop: 5,
          paddingBottom: 5
        },
      }}>
      <MainTab.Screen
        options={{
          title: 'En écoute',
          tabBarIcon: (props) => <FontAwesome5 name={'headphones'} color={props.color} size={theme.text.size.lg} />

        }}
        name="ListenNow"
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Recherche',
          tabBarIcon: (props) => <FontAwesome5 name={'search'} color={props.color} size={theme.text.size.lg} />
        }}
        name="Search"
        component={SearchStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Bibliothèque',
          tabBarIcon: (props) => <FontAwesome5 name={'archive'} color={props.color} size={theme.text.size.lg} />

        }}
        name="Library"
        component={LibraryStackNavigator}
      />
    </MainTab.Navigator>
  )
};

export default MainTabNavigator
