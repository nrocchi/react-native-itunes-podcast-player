import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'

import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {theme} from '../../constants/theme'
import {usePlayerContext} from '../../context/PlayerContext'
import ProgressSlider from './ProgressSlider'
import {makeHitSlop} from '../../constants/metrics'
import {getMonth, humanDuration} from '../../lib/dateTimeHelpers'

const PlayerScreen = (props: {
  favorites?: any
  dispatch: (arg0: {type: string; value: any}) => void
}) => {
  const playerContext = usePlayerContext()
  const navigation = useNavigation()

  const track = playerContext.currentTrack

  function _toggleFavorite() {
    const episodeWithPodcastInfo = {
      title: track?.title,
      description: track?.description,
      image: track?.image,
      linkUrl: track?.url,
      summary: track?.summary,
      text: track?.text,
      duration: track?.duration,
      pubDate: track?.date,
      thumbnail: track?.artwork,
      podcastName: track?.artist,
    }

    const action = {
      type: 'TOGGLE_FAVORITE',
      value: episodeWithPodcastInfo,
    }

    props.dispatch(action)
  }

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
            <Text color="white" size="xl" center bold mb="sm">
              {track?.title}
            </Text>
            <Text color="grey" size="md" center bold mb="sm">
              {track?.artist}
            </Text>

            {props.favorites.findIndex(
              (item: {linkUrl: string}) => item.linkUrl === track?.url,
            ) !== -1 ? (
              // The episode is in favorite redux state
              <TouchableOpacity
                onPress={() => _toggleFavorite()}
                hitSlop={makeHitSlop(20)}>
                <Box
                  dir="row"
                  radius="sm"
                  bg={theme.color.white}
                  px="xs"
                  py={5}
                  center>
                  <Icon
                    name="check"
                    size={theme.text.size.lg}
                    color={theme.color.primary}
                  />
                  <Text color="primary" bold size="xs" ml="xs">
                    Ajouté aux favoris
                  </Text>
                </Box>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => _toggleFavorite()}
                hitSlop={makeHitSlop(20)}>
                <Box
                  dir="row"
                  radius="sm"
                  bg={theme.color.primary}
                  px="xs"
                  py={5}
                  center>
                  <Icon
                    name="heart"
                    size={theme.text.size.lg}
                    color={theme.color.white}
                  />
                  <Text color="white" bold size="xs" ml="xs">
                    Ajouter aux favoris
                  </Text>
                </Box>
              </TouchableOpacity>
            )}
          </Box>

          <Box mb="sm">
            <Box dir="row" align="center" justify="center">
              <Box f={1} align="start">
                <Text size="xs" color="grey">
                  {track?.date && new Date(track?.date).getDate()}{' '}
                  {track?.date && getMonth(new Date(track?.date))}{' '}
                  {track?.date && new Date(track?.date).getFullYear()}
                </Text>
              </Box>

              <Box f={1} align="end">
                <Text size="xs" color="grey">
                  {track?.duration && humanDuration(track?.duration.toString())}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box bg="blackLight" px="sm" py="sm" radius={10}>
            <Box mb="md">
              <ProgressSlider />
            </Box>

            <Box dir="row" align="center" justify="center">
              <Box>
                <TouchableOpacity
                  onPress={() => playerContext.seekTo(-30)}
                  hitSlop={makeHitSlop(20)}>
                  <FontAwesome5
                    name={'backward'}
                    color={theme.color.primary}
                    size={theme.text.size.xl}
                  />
                </TouchableOpacity>
              </Box>
              <Box mx="lg">
                {playerContext.isPaused ? (
                  <TouchableOpacity
                    onPress={() => playerContext.play()}
                    hitSlop={makeHitSlop(20)}>
                    <Icon
                      name="play-circle"
                      size={70}
                      color={theme.color.primary}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={playerContext.pause}
                    hitSlop={makeHitSlop(20)}>
                    <Icon
                      name="pause-circle"
                      size={70}
                      color={theme.color.primary}
                    />
                  </TouchableOpacity>
                )}
              </Box>
              <Box>
                <TouchableOpacity
                  onPress={() => playerContext.seekTo()}
                  hitSlop={makeHitSlop(20)}>
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

const mapStateToProps = (state: any) => {
  return {
    favorites: state.favorites,
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    dispatch: (action: any) => {
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen)
