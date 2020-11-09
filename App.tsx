import 'react-native-gesture-handler'
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {Box, UtilityThemeProvider} from 'react-native-design-utility'
import {ApolloProvider} from '@apollo/react-hooks'
import TrackPlayer from 'react-native-track-player'
import SplashScreen from 'react-native-splash-screen'

import {ActivityIndicator} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {theme} from './src/constants/theme'
import MainStackNavigator from './src/navigators/MainStackNavigator'
import {client} from './src/graphql/client'
import {PlayerContextProvider} from './src/context/PlayerContext'
import {store, persistor} from './src/store/configStore'

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false)

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  React.useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      })

      setIsReady(true)
      console.log('TrackPlayer is ready')
    })
  }, [])

  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {isReady ? (
              <PlayerContextProvider>
                <NavigationContainer>
                  <MainStackNavigator />
                </NavigationContainer>
              </PlayerContextProvider>
            ) : (
              <Box f={1} center bg="black">
                <ActivityIndicator />
              </Box>
            )}
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </UtilityThemeProvider>
  )
}

export default App
