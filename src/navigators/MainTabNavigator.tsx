import React from 'react'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'

import {theme} from '../constants/theme'
import SubscribesScreen from '../components/subscribes/SubscribesScreen'
import SearchScreen from '../components/search/SearchScreen'
import PodcastDetailsScreen from '../components/podcast_details/PodcastDetailsScreen'
import MiniPlayer from '../components/mini_player/MiniPlayer'
import EpisodeDetailsScreen from '../components/episode_details/EpisodeDetailsScreen'
import FavoritesScreen from '../components/favorites/FavoritesScreen'
import HomeScreen from '../components/home/HomeScreen'

const MainTab = createBottomTabNavigator()

const SubscribesStack = createStackNavigator()
const SearchStack = createStackNavigator()
const FavoritesStack = createStackNavigator()
const HomeStack = createStackNavigator()

const SubscribesStackNavigator = () => {
  return (
    <SubscribesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.primary,
        headerTitleStyle: {
          fontWeight: 'normal',
          color: theme.color.white,
        },
        headerBackTitle: 'Retour',
      }}>
      <SubscribesStack.Screen
        options={{
          headerShown: false,
        }}
        name="Subscribes"
        component={SubscribesScreen}
      />

      <SubscribesStack.Screen
        options={{
          title: '',
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
      <SubscribesStack.Screen
        options={{
          title: '',
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
      />
    </SubscribesStack.Navigator>
  )
}

const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.primary,
        headerTitleStyle: {
          fontWeight: 'normal',
          color: theme.color.white,
        },
        headerBackTitle: 'Retour',
      }}>
      <FavoritesStack.Screen
        options={{
          headerShown: false,
        }}
        name="Favorites"
        component={FavoritesScreen}
      />

      <FavoritesStack.Screen
        options={{
          title: '',
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
      />

      <FavoritesStack.Screen
        options={{
          title: '',
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
    </FavoritesStack.Navigator>
  )
}

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
          color: theme.color.white,
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
          title: '',
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
      <SearchStack.Screen
        options={{
          title: '',
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
      />
    </SearchStack.Navigator>
  )
}

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.color.blackLight,
        },
        headerTintColor: theme.color.primary,
        headerTitleStyle: {
          fontWeight: 'normal',
          color: theme.color.white,
        },
        headerBackTitle: 'Retour',
      }}>
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  )
}

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
          paddingBottom: 5,
        },
      }}>
      <MainTab.Screen
        options={{
          title: 'Accueil',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'home'}
              color={props.color}
              size={theme.text.size.lg}
            />
          ),
        }}
        name="Home"
        component={HomeStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Recherche',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'search'}
              color={props.color}
              size={theme.text.size.lg}
            />
          ),
        }}
        name="Search"
        component={SearchStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Abonnements',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'podcast'}
              color={props.color}
              size={theme.text.size.lg}
            />
          ),
        }}
        name="Subscribes"
        component={SubscribesStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Favoris',
          tabBarIcon: (props) => (
            <Icon name="heart" size={theme.text.size.lg} color={props.color} />
          ),
        }}
        name="Favorites"
        component={FavoritesStackNavigator}
      />
    </MainTab.Navigator>
  )
}

export default MainTabNavigator
