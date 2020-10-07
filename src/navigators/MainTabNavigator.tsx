import React from 'react'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {theme} from '../constants/theme'
import ListenNowScreen from '../components/listen_now/ListenNowScreen'
import LibraryScreen from '../components/library/LibraryScreen'
import SearchScreen from '../components/search/SearchScreen'
import PodcastDetailsScreen from '../components/podcast_details/PodcastDetailsScreen'
import MiniPlayer from '../components/mini_player/MiniPlayer'
import EpisodeDetailsScreen from '../components/episode_details/EpisodeDetailsScreen'
import FavoritesScreen from '../components/favorites/FavoritesScreen'

const MainTab = createBottomTabNavigator()

const ListenNowStack = createStackNavigator()
const LibraryStack = createStackNavigator()
const SearchStack = createStackNavigator()
const FavoritesStack = createStackNavigator()

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

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator
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
      <LibraryStack.Screen
        options={{
          headerShown: false,
        }}
        name="Library"
        component={LibraryScreen}
      />

      <LibraryStack.Screen
        options={{
          title: '',
        }}
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
      <LibraryStack.Screen
        options={{
          title: '',
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
      />
    </LibraryStack.Navigator>
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
        name="PodcastDetails"
        component={PodcastDetailsScreen}
      />
      <FavoritesStack.Screen
        options={{
          title: '',
        }}
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
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
        name="ListenNow"
        component={ListenNowStackNavigator}
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
        name="Library"
        component={LibraryStackNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Favoris',
          tabBarIcon: (props) => (
            <FontAwesome5
              name={'heart'}
              color={props.color}
              size={theme.text.size.lg}
            />
          ),
        }}
        name="Favorites"
        component={FavoritesStackNavigator}
      />
    </MainTab.Navigator>
  )
}

export default MainTabNavigator
