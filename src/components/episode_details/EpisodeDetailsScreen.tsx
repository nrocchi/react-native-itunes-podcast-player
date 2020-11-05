import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Image, ScrollView, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

import {theme} from '../../constants/theme'
import {FeedQuery_feed, SearchQuery_search} from '../../types/graphql'
import {getMonth, getWeekDay, humanDuration} from '../../lib/dateTimeHelpers'
import {usePlayerContext} from '../../context/PlayerContext'
import HTMLReader from '../utils/HTMLReader'
import {makeHitSlop} from '../../constants/metrics'
import {favoritesSelector} from '../../store/favorites/favoritesSelector'
import {toggleFavoriteAction} from '../../store/favorites/favoritesActions'

const EpisodeDetailsScreen = (props: {
  favorites?: any
  dispatch: (arg0: {type: string; value: any}) => void
}) => {
  const routeParams = (useRoute().params ?? {}) as {
    episode: FeedQuery_feed
    podcast: SearchQuery_search
    podcastThumb: String
    podcastName: String
  }
  const playerContext = usePlayerContext()
  const navigation = useNavigation()

  function _toggleFavorite() {
    const episodeWithPodcastInfo = {
      title: routeParams.episode.title,
      description: routeParams.episode.description,
      image: routeParams.episode.image,
      linkUrl: routeParams.episode.linkUrl,
      summary: routeParams.episode.summary,
      text: routeParams.episode.text,
      duration: routeParams.episode.duration,
      pubDate: routeParams.episode.pubDate,
      thumbnail: routeParams.podcast.thumbnail,
      podcastName: routeParams.podcast.artist,
      date: new Date('now'),
    }

    props.dispatch(toggleFavoriteAction(episodeWithPodcastInfo))
  }

  return (
    <Box f={1} center bg="black">
      <ScrollView>
        <Box px="sm" mt="sm" style={{minWidth: '100%'}}>
          <Box center>
            <Box
              h={100}
              w={100}
              radius={5}
              mb="sm"
              style={{overflow: 'hidden'}}>
              <Image
                source={{
                  uri:
                    routeParams.episode.image ||
                    (props.favorites && props.favorites.image)
                      ? routeParams.episode.image || props.favorites.image
                      : routeParams.podcast.thumbnail ||
                        routeParams.podcastThumb,
                }}
                style={{flex: 1}}
              />
            </Box>
          </Box>

          <Text color="white" mb="xs" size="xl" bold>
            {routeParams.episode.title || props.favorites.title}
          </Text>
          <Text color="grey" bold size="sm" mb="sm">
            {routeParams.podcast.artist || routeParams.podcastName}
          </Text>

          {props.favorites.findIndex(
            (item: {linkUrl: string}) =>
              item.linkUrl === routeParams.episode.linkUrl ||
              props.favorites.linkUrl,
          ) !== -1 ? (
            // The episode is in favorite redux state
            <Box center mb="sm">
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
            </Box>
          ) : (
            <Box center mb="sm">
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
            </Box>
          )}

          <Box f={1} mb="sm">
            <Box
              dir="row"
              align="center"
              px="sm"
              py="xs"
              radius="xs"
              bg="blackLight">
              <Box mr="sm">
                {playerContext.currentTrack?.id ===
                (routeParams.episode.linkUrl || props.favorites.linkUrl) ? (
                  playerContext.isPaused ? (
                    <TouchableOpacity
                      onPress={() => playerContext.play()}
                      hitSlop={makeHitSlop(20)}>
                      <Icon
                        name="play-circle"
                        size={theme.text.size.xxl}
                        color={theme.color.primary}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={playerContext.pause}
                      hitSlop={makeHitSlop(20)}>
                      <Icon
                        name="pause-circle"
                        size={theme.text.size.xxl}
                        color={theme.color.primary}
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    hitSlop={makeHitSlop(20)}
                    onPress={() =>
                      playerContext.play({
                        id:
                          routeParams.episode.linkUrl ||
                          props.favorites.linkUrl,
                        title:
                          routeParams.episode.title || props.favorites.title,
                        artwork:
                          routeParams.episode.image ||
                          props.favorites.image ||
                          routeParams.podcast.thumbnail ||
                          props.favorites.thumbnail,
                        url:
                          routeParams.episode.linkUrl ||
                          props.favorites.linkUrl,
                        artist:
                          routeParams.podcast.artist ||
                          props.favorites.podcastName,
                        date:
                          routeParams.episode.pubDate ||
                          props.favorites.pubDate,
                        duration:
                          routeParams.episode.duration ||
                          props.favorites.duration,
                      })
                    }>
                    <Icon
                      name="play-circle"
                      size={theme.text.size.xxl}
                      color={theme.color.primary}
                    />
                  </TouchableOpacity>
                )}
              </Box>
              <Box>
                <Text bold color="primary">
                  {playerContext.isPlaying &&
                  playerContext.currentTrack?.id ===
                    (routeParams.episode.linkUrl || props.favorites.linkUrl)
                    ? 'Pause'
                    : 'Lecture'}
                </Text>
                <Text size="xs" color="white">
                  {humanDuration(
                    routeParams.episode.duration || props.favorites.duration,
                  )}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            px="sm"
            pt="xs"
            pb="sm"
            mb="md"
            radius="xs"
            bg={theme.color.blackLight}>
            <Text size="xs" mb="xs" color="white">
              {getWeekDay(
                new Date(
                  routeParams.episode.pubDate || props.favorites.pubDate,
                ),
              )}{' '}
              {new Date(
                routeParams.episode.pubDate || props.favorites.pubDate,
              ).getDate()}{' '}
              {getMonth(
                new Date(
                  routeParams.episode.pubDate || props.favorites.pubDate,
                ),
              )}{' '}
              {new Date(
                routeParams.episode.pubDate || props.favorites.pubDate,
              ).getFullYear()}
            </Text>
            {routeParams.episode.description ||
            props.favorites.description ||
            routeParams.episode.summary ||
            props.favorites.summary ? (
              <HTMLReader
                html={
                  routeParams.episode.description ||
                  (props.favorites && props.favorites.description)
                    ? routeParams.episode.description ||
                      props.favorites.description
                    : routeParams.episode.summary
                }
              />
            ) : (
              <Box dir="row" align="center">
                <Box mr="xs">
                  <FontAwesome5
                    name={'info-circle'}
                    color={theme.color.grey}
                    size={theme.text.size.md}
                  />
                </Box>
                <Text color="grey" size="sm" center>
                  Aucune description
                </Text>
              </Box>
            )}
            {/* <Text color="green" size="sm" style={{textAlign: 'justify'}}>
              {(routeParams.episode.description ||
                props.favorites.description ||
                routeParams.episode.summary) &&
                (routeParams.episode.description ||
                  props.favorites.description ||
                  routeParams.episode.summary)}
            </Text> */}
          </Box>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PodcastDetails', {
                data: routeParams.podcast || props.favorites,
              })
            }>
            <Box dir="row" align="center" justify="between" mb="xl">
              <Text color="grey">Voir tous les épisodes</Text>
              <FontAwesome5
                name={'chevron-right'}
                color={theme.color.grey}
                size={theme.text.size.xl}
              />
            </Box>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Box>
  )
}

const mapStateToProps = (state: any) => {
  return {
    favorites: favoritesSelector(state),
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    dispatch: (action: any) => {
      dispatch(action)
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EpisodeDetailsScreen)
