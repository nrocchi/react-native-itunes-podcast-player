import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'

import {theme} from '../../constants/theme'
import {usePlayerContext} from '../../context/PlayerContext'
import ProgressSlider from './ProgressSlider'
import {makeHitSlop} from '../../constants/metrics'

const PlayerScreen = () => {
  const playerContext = usePlayerContext()
  const navigation = useNavigation()

  const track = playerContext.currentTrack

  if (!track) {
    return null
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <Box
        px="sm"
        py="sm"
        bg="blackLight"
        dir="row"
        align="center"
        justify="between">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          hitSlop={makeHitSlop(20)}>
          <FontAwesome5
            name={'chevron-down'}
            color={theme.color.primary}
            size={theme.text.size.lg}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          hitSlop={makeHitSlop(20)}>
          <FontAwesome5
            name={'list'}
            color={theme.color.primary}
            size={theme.text.size.lg}
          />
        </TouchableOpacity>
      </Box>
      <Box f={1} center px="sm" bg="blackLight">
        <Box bg="black" px="sm" py="xl" radius={5} style={s.player}>
          <Box center mb="md">
            <Image source={{uri: track?.artwork}} style={s.img} />
          </Box>
          <Box center mb="md">
            <Text color="white" size="md" center bold mb="sm">
              {track?.title}
            </Text>
            <Text color="grey" size="md" center bold mb="sm">
              {track?.artist}
            </Text>
          </Box>

          <Box bg="blackLight" px="sm" py="sm" radius={10}>
            <Box mb="md">
              <ProgressSlider />
            </Box>

            <Box dir="row" align="center" justify="center">
              <Box>
                <TouchableOpacity onPress={() => playerContext.seekTo(-30)}>
                  <FontAwesome5
                    name={'backward'}
                    color={theme.color.primary}
                    size={theme.text.size.xl}
                  />
                </TouchableOpacity>
              </Box>
              <Box mx="xl">
                {playerContext.isPaused ? (
                  <TouchableOpacity onPress={() => playerContext.play()}>
                    <FontAwesome5
                      name={'play'}
                      color={theme.color.primary}
                      size={theme.text.size.xxl}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={playerContext.pause}>
                    <FontAwesome5
                      name={'pause'}
                      color={theme.color.primary}
                      size={theme.text.size.xxl}
                    />
                  </TouchableOpacity>
                )}
              </Box>
              <Box>
                <TouchableOpacity onPress={() => playerContext.seekTo()}>
                  <FontAwesome5
                    name={'forward'}
                    color={theme.color.primary}
                    size={theme.text.size.xl}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.color.blackLight,
  },
  img: {
    // width: width - (theme.space.md * 2),
    // height: width - (theme.space.md * 2),
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  player: {
    width: '100%',
  },
})

export default PlayerScreen
